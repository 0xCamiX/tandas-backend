import type { Request, Response } from "express";
import type { QuizService } from "../services/quizService";
import type { QuizFilters } from "../types/quiz.types";

export class QuizController {
	constructor(private readonly quizService: QuizService) {}

	/**
	 * Extrae el ID del usuario autenticado del request (agregado por el middleware de autenticación).
	 *
	 * @private
	 * @param {Request} req - Objeto de petición de Express
	 * @returns {string} ID del usuario autenticado
	 * @throws {Error} Si el usuario no está autenticado (código: "UNAUTHORIZED")
	 */
	private getCurrentUserId(req: Request): string {
		if (!req.userId) {
			throw new Error("UNAUTHORIZED");
		}
		return req.userId;
	}

	/**
	 * Maneja la petición GET /api/quizzes para obtener todos los quizzes con filtros opcionales.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.query contiene los filtros)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async getAllQuizzes(req: Request, res: Response): Promise<void> {
		try {
			const filters: QuizFilters = {};

			if (req.query.moduleId) {
				filters.moduleId = req.query.moduleId as string;
			}

			const quizzes = await this.quizService.getAllQuizzes(filters);

			res.status(200).json({
				success: true,
				data: quizzes,
			});
		} catch (_error) {
			res.status(500).json({
				success: false,
				error: {
					code: "INTERNAL_ERROR",
					message: "Error interno del servidor",
				},
			});
		}
	}

	/**
	 * Maneja la petición GET /api/quizzes/modules/:moduleId para obtener todos los quizzes de un módulo.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.params.moduleId contiene el ID del módulo)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async getQuizzesByModuleId(req: Request, res: Response): Promise<void> {
		try {
			const { moduleId } = req.params;

			if (!moduleId) {
				res.status(400).json({
					success: false,
					error: {
						code: "INVALID_MODULE_ID",
						message: "ID de módulo requerido",
					},
				});
				return;
			}

			const quizzes = await this.quizService.getQuizzesByModuleId(moduleId);

			res.status(200).json({
				success: true,
				data: quizzes,
			});
		} catch (_error) {
			res.status(500).json({
				success: false,
				error: {
					code: "INTERNAL_ERROR",
					message: "Error interno del servidor",
				},
			});
		}
	}

	/**
	 * Maneja la petición GET /api/quizzes/:id para obtener un quiz por su ID.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.params.id contiene el ID del quiz)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async getQuizById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;

			if (!id) {
				res.status(400).json({
					success: false,
					error: {
						code: "INVALID_QUIZ_ID",
						message: "ID de quiz requerido",
					},
				});
				return;
			}

			const quiz = await this.quizService.getQuizById(id);

			res.status(200).json({
				success: true,
				data: quiz,
			});
		} catch (error) {
			if (error instanceof Error) {
				if (error.message === "QUIZ_NOT_FOUND") {
					res.status(404).json({
						success: false,
						error: {
							code: "QUIZ_NOT_FOUND",
							message: "Quiz no encontrado",
						},
					});
					return;
				}
			}

			res.status(500).json({
				success: false,
				error: {
					code: "INTERNAL_ERROR",
					message: "Error interno del servidor",
				},
			});
		}
	}

	/**
	 * Maneja la petición GET /api/quizzes/:id/options para obtener un quiz con sus opciones.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.params.id contiene el ID del quiz)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async getQuizWithOptions(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;

			if (!id) {
				res.status(400).json({
					success: false,
					error: {
						code: "INVALID_QUIZ_ID",
						message: "ID de quiz requerido",
					},
				});
				return;
			}

			const quiz = await this.quizService.getQuizByIdWithOptions(id);

			res.status(200).json({
				success: true,
				data: quiz,
			});
		} catch (error) {
			if (error instanceof Error) {
				if (error.message === "QUIZ_NOT_FOUND") {
					res.status(404).json({
						success: false,
						error: {
							code: "QUIZ_NOT_FOUND",
							message: "Quiz no encontrado",
						},
					});
					return;
				}
			}

			res.status(500).json({
				success: false,
				error: {
					code: "INTERNAL_ERROR",
					message: "Error interno del servidor",
				},
			});
		}
	}

	/**
	 * Maneja la petición POST /api/quizzes para crear un nuevo quiz.
	 * El body de la petición debe estar validado previamente por el middleware de validación.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.body contiene los datos validados)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async createQuiz(req: Request, res: Response): Promise<void> {
		try {
			const quiz = await this.quizService.createQuiz(req.body);

			res.status(201).json({
				success: true,
				data: quiz,
				message: "Quiz creado exitosamente",
			});
		} catch (_error) {
			res.status(500).json({
				success: false,
				error: {
					code: "INTERNAL_ERROR",
					message: "Error interno del servidor",
				},
			});
		}
	}

	/**
	 * Maneja la petición PUT /api/quizzes/:id para actualizar un quiz.
	 * El body de la petición debe estar validado previamente por el middleware de validación.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.params.id contiene el ID del quiz, req.body contiene los datos validados)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async updateQuiz(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;

			if (!id) {
				res.status(400).json({
					success: false,
					error: {
						code: "INVALID_QUIZ_ID",
						message: "ID de quiz requerido",
					},
				});
				return;
			}

			const quiz = await this.quizService.updateQuiz(id, req.body);

			res.status(200).json({
				success: true,
				data: quiz,
				message: "Quiz actualizado exitosamente",
			});
		} catch (error) {
			if (error instanceof Error) {
				if (error.message === "QUIZ_NOT_FOUND") {
					res.status(404).json({
						success: false,
						error: {
							code: "QUIZ_NOT_FOUND",
							message: "Quiz no encontrado",
						},
					});
					return;
				}
			}

			res.status(500).json({
				success: false,
				error: {
					code: "INTERNAL_ERROR",
					message: "Error interno del servidor",
				},
			});
		}
	}

	/**
	 * Maneja la petición DELETE /api/quizzes/:id para eliminar un quiz.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.params.id contiene el ID del quiz)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async deleteQuiz(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;

			if (!id) {
				res.status(400).json({
					success: false,
					error: {
						code: "INVALID_QUIZ_ID",
						message: "ID de quiz requerido",
					},
				});
				return;
			}

			await this.quizService.deleteQuiz(id);

			res.status(200).json({
				success: true,
				message: "Quiz eliminado exitosamente",
			});
		} catch (error) {
			if (error instanceof Error) {
				if (error.message === "QUIZ_NOT_FOUND") {
					res.status(404).json({
						success: false,
						error: {
							code: "QUIZ_NOT_FOUND",
							message: "Quiz no encontrado",
						},
					});
					return;
				}
			}

			res.status(500).json({
				success: false,
				error: {
					code: "INTERNAL_ERROR",
					message: "Error interno del servidor",
				},
			});
		}
	}

	/**
	 * Maneja la petición POST /api/quizzes/:id/attempt para realizar un intento de quiz.
	 * El body de la petición debe estar validado previamente por el middleware de validación.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.params.id contiene el ID del quiz, req.body contiene las respuestas)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async createQuizAttempt(req: Request, res: Response): Promise<void> {
		try {
			const userId = this.getCurrentUserId(req);
			const { id } = req.params;

			if (!id) {
				res.status(400).json({
					success: false,
					error: {
						code: "INVALID_QUIZ_ID",
						message: "ID de quiz requerido",
					},
				});
				return;
			}

			if (req.body.quizId && req.body.quizId !== id) {
				res.status(400).json({
					success: false,
					error: {
						code: "INVALID_QUIZ_ID",
						message: "El quizId del body no coincide con el parámetro",
					},
				});
				return;
			}

			const attempt = await this.quizService.createQuizAttempt(userId, {
				quizId: id,
				responses: req.body.responses,
			});

			res.status(201).json({
				success: true,
				data: attempt,
				message: "Intento de quiz realizado exitosamente",
			});
		} catch (error) {
			if (error instanceof Error) {
				if (error.message === "UNAUTHORIZED") {
					res.status(401).json({
						success: false,
						error: {
							code: "UNAUTHORIZED",
							message: "No autenticado",
						},
					});
					return;
				}
				if (error.message === "QUIZ_NOT_FOUND") {
					res.status(404).json({
						success: false,
						error: {
							code: "QUIZ_NOT_FOUND",
							message: "Quiz no encontrado",
						},
					});
					return;
				}
				if (error.message === "INVALID_OPTION") {
					res.status(400).json({
						success: false,
						error: {
							code: "INVALID_OPTION",
							message: "Una o más opciones seleccionadas no son válidas",
						},
					});
					return;
				}
				if (error.message === "INCOMPLETE_RESPONSES") {
					res.status(400).json({
						success: false,
						error: {
							code: "INCOMPLETE_RESPONSES",
							message: "Debes responder todas las preguntas del módulo",
						},
					});
					return;
				}
			}

			res.status(500).json({
				success: false,
				error: {
					code: "INTERNAL_ERROR",
					message: "Error interno del servidor",
				},
			});
		}
	}

	/**
	 * Maneja la petición GET /api/quizzes/:id/attempts para obtener todos los intentos del usuario en un quiz.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.params.id contiene el ID del quiz)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async getQuizAttempts(req: Request, res: Response): Promise<void> {
		try {
			const userId = this.getCurrentUserId(req);
			const { id } = req.params;

			if (!id) {
				res.status(400).json({
					success: false,
					error: {
						code: "INVALID_QUIZ_ID",
						message: "ID de quiz requerido",
					},
				});
				return;
			}

			const attempts = await this.quizService.getQuizAttemptsByUserAndQuiz(
				userId,
				id
			);

			res.status(200).json({
				success: true,
				data: attempts,
			});
		} catch (error) {
			if (error instanceof Error) {
				if (error.message === "UNAUTHORIZED") {
					res.status(401).json({
						success: false,
						error: {
							code: "UNAUTHORIZED",
							message: "No autenticado",
						},
					});
					return;
				}
			}

			res.status(500).json({
				success: false,
				error: {
					code: "INTERNAL_ERROR",
					message: "Error interno del servidor",
				},
			});
		}
	}
}
