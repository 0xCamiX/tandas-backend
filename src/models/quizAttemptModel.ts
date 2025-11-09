import { prisma } from "../db/prisma";
import type { Prisma, QuizAttempt } from "../generated/prisma/client";
import type {
	QuizAttemptResponse,
	QuizAttemptWithDetailsResponse,
} from "../types/quiz.types";

export class QuizAttemptModel {
	/**
	 * Obtiene todos los intentos de quiz de un usuario específico.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @returns {Promise<QuizAttemptResponse[]>} Array de intentos del usuario
	 */
	async findByUserId(userId: string): Promise<QuizAttemptResponse[]> {
		const attempts = await prisma.quizAttempt.findMany({
			where: { userId },
			orderBy: {
				attemptedAt: "desc",
			},
		});

		return attempts.map(this.mapToResponse);
	}

	/**
	 * Obtiene todos los intentos de un quiz específico.
	 *
	 * @param {string} quizId - Identificador único del quiz (UUID)
	 * @returns {Promise<QuizAttemptResponse[]>} Array de intentos del quiz
	 */
	async findByQuizId(quizId: string): Promise<QuizAttemptResponse[]> {
		const attempts = await prisma.quizAttempt.findMany({
			where: { quizId },
			orderBy: {
				attemptedAt: "desc",
			},
		});

		return attempts.map(this.mapToResponse);
	}

	/**
	 * Obtiene todos los intentos de un usuario en un quiz específico.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @param {string} quizId - Identificador único del quiz (UUID)
	 * @returns {Promise<QuizAttemptResponse[]>} Array de intentos del usuario en el quiz
	 */
	async findByUserAndQuiz(
		userId: string,
		quizId: string
	): Promise<QuizAttemptResponse[]> {
		const attempts = await prisma.quizAttempt.findMany({
			where: {
				userId,
				quizId,
			},
			orderBy: {
				attemptedAt: "desc",
			},
		});

		return attempts.map(this.mapToResponse);
	}

	/**
	 * Obtiene un intento por su ID incluyendo sus detalles.
	 *
	 * @param {string} attemptId - Identificador único del intento (UUID)
	 * @returns {Promise<QuizAttemptWithDetailsResponse | null>} Intento con detalles o null si no existe
	 */
	async findByIdWithDetails(
		attemptId: string
	): Promise<QuizAttemptWithDetailsResponse | null> {
		const attempt = await prisma.quizAttempt.findUnique({
			where: { id: attemptId },
			include: {
				quiz: {
					select: {
						id: true,
						question: true,
						explanation: true,
					},
				},
				responses: {
					include: {
						quizOption: {
							select: {
								id: true,
								optionText: true,
								isCorrect: true,
							},
						},
					},
				},
			},
		});

		if (!attempt) {
			return null;
		}

		return {
			...this.mapToResponse(attempt),
			quiz: attempt.quiz,
			responses: attempt.responses.map((response) => ({
				id: response.id,
				quizOptionId: response.quizOptionId,
				quizOption: response.quizOption,
			})),
		};
	}

	/**
	 * Crea un nuevo intento de quiz en la base de datos.
	 *
	 * @param {Prisma.QuizAttemptCreateInput} data - Datos del intento a crear
	 * @returns {Promise<QuizAttemptResponse>} Intento creado
	 */
	async create(
		data: Prisma.QuizAttemptCreateInput
	): Promise<QuizAttemptResponse> {
		const attempt = await prisma.quizAttempt.create({
			data,
		});

		return this.mapToResponse(attempt);
	}

	/**
	 * Mapea un modelo de Prisma a un QuizAttemptResponse.
	 *
	 * @param {QuizAttempt} attempt - Intento de Prisma
	 * @returns {QuizAttemptResponse} Intento mapeado
	 */
	mapToResponse(attempt: QuizAttempt): QuizAttemptResponse {
		return {
			id: attempt.id,
			userId: attempt.userId,
			quizId: attempt.quizId,
			score: attempt.score,
			isCorrect: attempt.isCorrect,
			attemptedAt: attempt.attemptedAt,
			createdAt: attempt.createdAt,
			updatedAt: attempt.updatedAt,
		};
	}
}
