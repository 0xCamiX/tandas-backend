import type { Request, Response } from "express";
import type { UserService } from "../services/userService";

export class UserController {
	constructor(private readonly userService: UserService) {}

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
	 * Maneja la petición GET /api/users/me para obtener el perfil básico del usuario actual.
	 *
	 * @param {Request} req - Objeto de petición de Express
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async getCurrentUser(req: Request, res: Response): Promise<void> {
		try {
			const userId = this.getCurrentUserId(req);
			const user = await this.userService.getCurrentUserProfile(userId);

			res.status(200).json({
				success: true,
				data: user,
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
				if (error.message === "USER_NOT_FOUND") {
					res.status(404).json({
						success: false,
						error: {
							code: "USER_NOT_FOUND",
							message: "Usuario no encontrado",
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
	 * Maneja la petición GET /api/users/me/full para obtener el perfil completo del usuario con todas sus relaciones educativas.
	 *
	 * @param {Request} req - Objeto de petición de Express
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async getCurrentUserFull(req: Request, res: Response): Promise<void> {
		try {
			const userId = this.getCurrentUserId(req);
			const user = await this.userService.getCurrentUserWithRelations(userId);

			res.status(200).json({
				success: true,
				data: user,
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
				if (error.message === "USER_NOT_FOUND") {
					res.status(404).json({
						success: false,
						error: {
							code: "USER_NOT_FOUND",
							message: "Usuario no encontrado",
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
	 * Maneja la petición PUT /api/users/me para actualizar el perfil del usuario actual.
	 * El body de la petición debe estar validado previamente por el middleware de validación.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.body contiene los datos validados)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async updateCurrentUser(req: Request, res: Response): Promise<void> {
		try {
			const userId = this.getCurrentUserId(req);
			const updateData = req.body;

			const updatedUser = await this.userService.updateUserProfile(
				userId,
				updateData
			);

			res.status(200).json({
				success: true,
				data: updatedUser,
				message: "Perfil actualizado exitosamente",
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
				if (error.message === "USER_NOT_FOUND") {
					res.status(404).json({
						success: false,
						error: {
							code: "USER_NOT_FOUND",
							message: "Usuario no encontrado",
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
	 * Maneja la petición GET /api/users/me/stats para obtener las estadísticas del usuario actual.
	 *
	 * @param {Request} req - Objeto de petición de Express
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async getCurrentUserStats(req: Request, res: Response): Promise<void> {
		try {
			const userId = this.getCurrentUserId(req);
			const stats = await this.userService.getUserStats(userId);

			res.status(200).json({
				success: true,
				data: stats,
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
				if (error.message === "USER_NOT_FOUND") {
					res.status(404).json({
						success: false,
						error: {
							code: "USER_NOT_FOUND",
							message: "Usuario no encontrado",
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
	 * Maneja la petición GET /api/users/me/progress para obtener el progreso general del usuario en todos sus cursos.
	 *
	 * @param {Request} req - Objeto de petición de Express
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async getCurrentUserProgress(req: Request, res: Response): Promise<void> {
		try {
			const userId = this.getCurrentUserId(req);
			const progress = await this.userService.getUserProgress(userId);

			res.status(200).json({
				success: true,
				data: progress,
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
				if (error.message === "USER_NOT_FOUND") {
					res.status(404).json({
						success: false,
						error: {
							code: "USER_NOT_FOUND",
							message: "Usuario no encontrado",
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
	 * Maneja la petición GET /api/users/me/progress/:courseId para obtener el progreso del usuario en un curso específico.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.params.courseId contiene el ID del curso)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async getCurrentUserProgressByCourse(
		req: Request,
		res: Response
	): Promise<void> {
		try {
			const userId = this.getCurrentUserId(req);
			const { courseId } = req.params;

			if (!courseId) {
				res.status(400).json({
					success: false,
					error: {
						code: "INVALID_COURSE_ID",
						message: "ID de curso requerido",
					},
				});
				return;
			}

			const progress = await this.userService.getUserProgressByCourse(
				userId,
				courseId
			);

			res.status(200).json({
				success: true,
				data: progress,
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
				if (error.message === "USER_NOT_FOUND") {
					res.status(404).json({
						success: false,
						error: {
							code: "USER_NOT_FOUND",
							message: "Usuario no encontrado",
						},
					});
					return;
				}
				if (error.message === "ENROLLMENT_NOT_FOUND") {
					res.status(404).json({
						success: false,
						error: {
							code: "ENROLLMENT_NOT_FOUND",
							message: "No estás inscrito en este curso",
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
	 * Maneja la petición GET /api/users/me/enrollments para obtener todas las inscripciones del usuario actual.
	 *
	 * @param {Request} req - Objeto de petición de Express
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async getCurrentUserEnrollments(req: Request, res: Response): Promise<void> {
		try {
			const userId = this.getCurrentUserId(req);
			const enrollments = await this.userService.getUserEnrollments(userId);

			res.status(200).json({
				success: true,
				data: enrollments,
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
				if (error.message === "USER_NOT_FOUND") {
					res.status(404).json({
						success: false,
						error: {
							code: "USER_NOT_FOUND",
							message: "Usuario no encontrado",
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
