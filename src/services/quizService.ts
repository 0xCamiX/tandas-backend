import { prisma } from "../db/prisma";
import type { QuizType } from "../generated/prisma/client";
import type { QuizAttemptModel } from "../models/quizAttemptModel";
import type { QuizModel } from "../models/quizModel";
import type {
	CreateQuizAttemptDto,
	CreateQuizDto,
	QuizAttemptResponse,
	QuizAttemptWithDetailsResponse,
	QuizFilters,
	QuizResponse,
	QuizWithOptionsResponse,
	UpdateQuizDto,
} from "../types/quiz.types";

export class QuizService {
	constructor(
		private readonly quizModel: QuizModel,
		private readonly quizAttemptModel: QuizAttemptModel
	) {}

	/**
	 * Obtiene todos los quizzes aplicando filtros opcionales.
	 *
	 * @param {QuizFilters} [filters] - Filtros opcionales para buscar quizzes
	 * @returns {Promise<QuizResponse[]>} Array de quizzes que coinciden con los filtros
	 */
	async getAllQuizzes(filters?: QuizFilters): Promise<QuizResponse[]> {
		return this.quizModel.findAll(filters);
	}

	/**
	 * Obtiene todos los quizzes de un módulo específico.
	 *
	 * @param {string} moduleId - Identificador único del módulo (UUID)
	 * @returns {Promise<QuizResponse[]>} Array de quizzes del módulo
	 */
	async getQuizzesByModuleId(moduleId: string): Promise<QuizResponse[]> {
		return this.quizModel.findByModuleId(moduleId);
	}

	/**
	 * Obtiene un quiz por su ID.
	 *
	 * @param {string} quizId - Identificador único del quiz (UUID)
	 * @returns {Promise<QuizResponse>} Quiz encontrado
	 * @throws {Error} Si el quiz no existe (código: "QUIZ_NOT_FOUND")
	 */
	async getQuizById(quizId: string): Promise<QuizResponse> {
		const quiz = await this.quizModel.findById(quizId);

		if (!quiz) {
			throw new Error("QUIZ_NOT_FOUND");
		}

		return quiz;
	}

	/**
	 * Obtiene un quiz por su ID incluyendo sus opciones.
	 *
	 * @param {string} quizId - Identificador único del quiz (UUID)
	 * @returns {Promise<QuizWithOptionsResponse>} Quiz con opciones
	 * @throws {Error} Si el quiz no existe (código: "QUIZ_NOT_FOUND")
	 */
	async getQuizByIdWithOptions(
		quizId: string
	): Promise<QuizWithOptionsResponse> {
		const quiz = await this.quizModel.findByIdWithOptions(quizId);

		if (!quiz) {
			throw new Error("QUIZ_NOT_FOUND");
		}

		return quiz;
	}

	/**
	 * Crea un nuevo quiz. Los datos deben estar validados previamente por el middleware de validación.
	 *
	 * @param {CreateQuizDto} data - Datos del quiz a crear
	 * @returns {Promise<QuizWithOptionsResponse>} Quiz creado con opciones
	 */
	async createQuiz(data: CreateQuizDto): Promise<QuizWithOptionsResponse> {
		return this.quizModel.create({
			module: {
				connect: {
					id: data.moduleId,
				},
			},
			question: data.question,
			type: data.type || "MULTIPLE_CHOICE",
			explanation: data.explanation,
			options: {
				create: data.options.map((option) => ({
					optionText: option.optionText,
					isCorrect: option.isCorrect,
					order: option.order ?? 0,
				})),
			},
		});
	}

	/**
	 * Actualiza un quiz. Los datos deben estar validados previamente por el middleware de validación.
	 *
	 * @param {string} quizId - Identificador único del quiz (UUID)
	 * @param {UpdateQuizDto} data - Datos a actualizar del quiz
	 * @returns {Promise<QuizResponse>} Quiz actualizado
	 * @throws {Error} Si el quiz no existe (código: "QUIZ_NOT_FOUND")
	 */
	async updateQuiz(quizId: string, data: UpdateQuizDto): Promise<QuizResponse> {
		const exists = await this.quizModel.exists(quizId);
		if (!exists) {
			throw new Error("QUIZ_NOT_FOUND");
		}

		const updateData: {
			question?: string;
			type?: QuizType;
			explanation?: string | null;
			updatedAt: Date;
		} = {
			updatedAt: new Date(),
		};

		if (data.question !== undefined) {
			updateData.question = data.question;
		}

		if (data.type !== undefined) {
			updateData.type = data.type;
		}

		if (data.explanation !== undefined) {
			updateData.explanation = data.explanation || null;
		}

		return this.quizModel.update(quizId, updateData);
	}

	/**
	 * Elimina un quiz.
	 *
	 * @param {string} quizId - Identificador único del quiz (UUID)
	 * @returns {Promise<void>} No retorna valor
	 * @throws {Error} Si el quiz no existe (código: "QUIZ_NOT_FOUND")
	 */
	async deleteQuiz(quizId: string): Promise<void> {
		const exists = await this.quizModel.exists(quizId);
		if (!exists) {
			throw new Error("QUIZ_NOT_FOUND");
		}

		await this.quizModel.delete(quizId);
	}

	/**
	 * Realiza un intento de quiz y calcula la calificación.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @param {CreateQuizAttemptDto} data - Datos del intento (quizId y respuestas)
	 * @returns {Promise<QuizAttemptResponse>} Intento creado con calificación
	 * @throws {Error} Si el quiz no existe (código: "QUIZ_NOT_FOUND")
	 * @throws {Error} Si alguna opción de respuesta no existe (código: "INVALID_OPTION")
	 */
	async createQuizAttempt(
		userId: string,
		data: CreateQuizAttemptDto
	): Promise<QuizAttemptResponse> {
		// Verificar que el quiz existe y obtener sus opciones correctas
		const quiz = await this.quizModel.findByIdWithOptions(data.quizId);

		if (!quiz) {
			throw new Error("QUIZ_NOT_FOUND");
		}

		// Verificar que todas las opciones seleccionadas existen y pertenecen al quiz
		const selectedOptionIds = new Set(
			data.responses.map((r) => r.quizOptionId)
		);
		const validOptionIds = new Set(quiz.options.map((o) => o.id));

		for (const optionId of selectedOptionIds) {
			if (!validOptionIds.has(optionId)) {
				throw new Error("INVALID_OPTION");
			}
		}

		// Calcular la calificación
		const correctOptions = quiz.options.filter((o) => o.isCorrect);
		const selectedOptions = quiz.options.filter((o) =>
			selectedOptionIds.has(o.id)
		);

		// Verificar si todas las respuestas correctas fueron seleccionadas
		// y ninguna incorrecta fue seleccionada
		const allCorrectSelected = correctOptions.every((o) =>
			selectedOptionIds.has(o.id)
		);
		const noIncorrectSelected = selectedOptions.every((o) => o.isCorrect);

		const isCorrect = allCorrectSelected && noIncorrectSelected;
		const score = isCorrect ? 1.0 : 0.0;

		// Crear el intento con las respuestas
		const attempt = await prisma.quizAttempt.create({
			data: {
				user: {
					connect: {
						id: userId,
					},
				},
				quiz: {
					connect: {
						id: data.quizId,
					},
				},
				score,
				isCorrect,
				responses: {
					create: data.responses.map((response) => ({
						quizOption: {
							connect: {
								id: response.quizOptionId,
							},
						},
					})),
				},
			},
		});

		return this.quizAttemptModel.mapToResponse(attempt);
	}

	/**
	 * Obtiene todos los intentos de un usuario en un quiz específico.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @param {string} quizId - Identificador único del quiz (UUID)
	 * @returns {Promise<QuizAttemptResponse[]>} Array de intentos del usuario en el quiz
	 */
	async getQuizAttemptsByUserAndQuiz(
		userId: string,
		quizId: string
	): Promise<QuizAttemptResponse[]> {
		return this.quizAttemptModel.findByUserAndQuiz(userId, quizId);
	}

	/**
	 * Obtiene un intento por su ID incluyendo sus detalles.
	 *
	 * @param {string} attemptId - Identificador único del intento (UUID)
	 * @returns {Promise<QuizAttemptWithDetailsResponse>} Intento con detalles
	 * @throws {Error} Si el intento no existe (código: "ATTEMPT_NOT_FOUND")
	 */
	async getQuizAttemptByIdWithDetails(
		attemptId: string
	): Promise<QuizAttemptWithDetailsResponse> {
		const attempt = await this.quizAttemptModel.findByIdWithDetails(attemptId);

		if (!attempt) {
			throw new Error("ATTEMPT_NOT_FOUND");
		}

		return attempt;
	}
}
