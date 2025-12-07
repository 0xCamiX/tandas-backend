import { prisma } from "../db/prisma";
import type { Prisma, Quiz } from "../generated/prisma/client";
import type {
	QuizFilters,
	QuizResponse,
	QuizWithOptionsResponse,
} from "../types/quiz.types";

export class QuizModel {
	/**
	 * Obtiene todos los quizzes aplicando filtros opcionales.
	 *
	 * @param {QuizFilters} [filters] - Filtros opcionales para buscar quizzes
	 * @returns {Promise<QuizResponse[]>} Array de quizzes que coinciden con los filtros
	 */
	async findAll(filters?: QuizFilters): Promise<QuizResponse[]> {
		const where: Prisma.QuizWhereInput = {};

		if (filters?.moduleId) {
			where.moduleId = filters.moduleId;
		}

		const quizzes = await prisma.quiz.findMany({
			where,
			orderBy: {
				createdAt: "asc",
			},
		});

		return quizzes.map(this.mapToResponse);
	}

	/**
	 * Obtiene todos los quizzes de un módulo específico.
	 *
	 * @param {string} moduleId - Identificador único del módulo (UUID)
	 * @returns {Promise<QuizResponse[]>} Array de quizzes del módulo
	 */
	async findByModuleId(moduleId: string): Promise<QuizResponse[]> {
		const quizzes = await prisma.quiz.findMany({
			where: { moduleId },
			orderBy: {
				createdAt: "asc",
			},
		});

		return quizzes.map(this.mapToResponse);
	}

	/**
	 * Obtiene un quiz por su ID.
	 *
	 * @param {string} quizId - Identificador único del quiz (UUID)
	 * @returns {Promise<QuizResponse | null>} Quiz o null si no existe
	 */
	async findById(quizId: string): Promise<QuizResponse | null> {
		const quiz = await prisma.quiz.findUnique({
			where: { id: quizId },
		});

		if (!quiz) {
			return null;
		}

		return this.mapToResponse(quiz);
	}

	/**
	 * Obtiene un quiz por su ID incluyendo sus opciones.
	 *
	 * @param {string} quizId - Identificador único del quiz (UUID)
	 * @returns {Promise<QuizWithOptionsResponse | null>} Quiz con opciones o null si no existe
	 */
	async findByIdWithOptions(
		quizId: string
	): Promise<QuizWithOptionsResponse | null> {
		const quiz = await prisma.quiz.findUnique({
			where: { id: quizId },
			include: {
				options: {
					orderBy: {
						order: "asc",
					},
				},
			},
		});

		if (!quiz) {
			return null;
		}

		return {
			...this.mapToResponse(quiz),
			options: quiz.options.map((option) => ({
				id: option.id,
				optionText: option.optionText,
				isCorrect: option.isCorrect,
				order: option.order,
			})),
		};
	}

	/**
	 * Crea un nuevo quiz en la base de datos con sus opciones.
	 *
	 * @param {Prisma.QuizCreateInput} data - Datos del quiz a crear
	 * @returns {Promise<QuizWithOptionsResponse>} Quiz creado con opciones
	 */
	async create(data: Prisma.QuizCreateInput): Promise<QuizWithOptionsResponse> {
		const quiz = await prisma.quiz.create({
			data,
			include: {
				options: {
					orderBy: {
						order: "asc",
					},
				},
			},
		});

		return {
			...this.mapToResponse(quiz),
			options: quiz.options.map((option) => ({
				id: option.id,
				optionText: option.optionText,
				isCorrect: option.isCorrect,
				order: option.order,
			})),
		};
	}

	/**
	 * Actualiza un quiz en la base de datos.
	 *
	 * @param {string} quizId - Identificador único del quiz (UUID)
	 * @param {Prisma.QuizUpdateInput} data - Datos a actualizar del quiz
	 * @returns {Promise<QuizResponse>} Quiz actualizado
	 * @throws {Error} Si el quiz no existe
	 */
	async update(
		quizId: string,
		data: Prisma.QuizUpdateInput
	): Promise<QuizResponse> {
		const quiz = await prisma.quiz.update({
			where: { id: quizId },
			data,
		});

		return this.mapToResponse(quiz);
	}

	/**
	 * Elimina un quiz de la base de datos.
	 *
	 * @param {string} quizId - Identificador único del quiz (UUID)
	 * @returns {Promise<void>} No retorna valor
	 * @throws {Error} Si el quiz no existe
	 */
	async delete(quizId: string): Promise<void> {
		await prisma.quiz.delete({
			where: { id: quizId },
		});
	}

	/**
	 * Verifica si un quiz existe.
	 *
	 * @param {string} quizId - Identificador único del quiz (UUID)
	 * @returns {Promise<boolean>} true si existe, false si no
	 */
	async exists(quizId: string): Promise<boolean> {
		const count = await prisma.quiz.count({
			where: { id: quizId },
		});

		return count > 0;
	}

	/**
	 * Mapea un modelo de Prisma a un QuizResponse.
	 *
	 * @private
	 * @param {Quiz} quiz - Quiz de Prisma
	 * @returns {QuizResponse} Quiz mapeado
	 */
	private mapToResponse(quiz: Quiz): QuizResponse {
		return {
			id: quiz.id,
			moduleId: quiz.moduleId,
			question: quiz.question,
			type: quiz.type,
			explanation: quiz.explanation,
			createdAt: quiz.createdAt,
			updatedAt: quiz.updatedAt,
		};
	}
}
