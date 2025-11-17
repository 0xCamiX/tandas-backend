import type { Request, Response } from "express";
import type { EnrollmentService } from "../services/enrollmentService";
import type { EnrollmentFilters } from "../types/enrollment.types";

export class EnrollmentController {
	constructor(private readonly enrollmentService: EnrollmentService) {}

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
	 * Maneja la petición GET /api/enrollments para obtener todas las inscripciones con filtros opcionales.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.query contiene los filtros)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async getAllEnrollments(req: Request, res: Response): Promise<void> {
		try {
			const filters: EnrollmentFilters = {};

			if (req.query.userId) {
				filters.userId = req.query.userId as string;
			}

			if (req.query.courseId) {
				filters.courseId = req.query.courseId as string;
			}

			const enrollments =
				await this.enrollmentService.getAllEnrollments(filters);

			res.status(200).json({
				success: true,
				data: enrollments,
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
	 * Maneja la petición GET /api/enrollments/me para obtener todas las inscripciones del usuario actual.
	 *
	 * @param {Request} req - Objeto de petición de Express
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async getMyEnrollments(req: Request, res: Response): Promise<void> {
		try {
			const userId = this.getCurrentUserId(req);
			const enrollments =
				await this.enrollmentService.getEnrollmentsByUserId(userId);

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
	 * Maneja la petición GET /api/enrollments/:id para obtener una inscripción por su ID.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.params.id contiene el ID de la inscripción)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async getEnrollmentById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;

			if (!id) {
				res.status(400).json({
					success: false,
					error: {
						code: "INVALID_ENROLLMENT_ID",
						message: "ID de inscripción requerido",
					},
				});
				return;
			}

			const enrollment = await this.enrollmentService.getEnrollmentById(id);

			res.status(200).json({
				success: true,
				data: enrollment,
			});
		} catch (error) {
			if (error instanceof Error) {
				if (error.message === "ENROLLMENT_NOT_FOUND") {
					res.status(404).json({
						success: false,
						error: {
							code: "ENROLLMENT_NOT_FOUND",
							message: "Inscripción no encontrada",
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
	 * Maneja la petición POST /api/enrollments/courses/:courseId para inscribirse a un curso.
	 * El usuario se obtiene del token de autenticación.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.params.courseId contiene el ID del curso)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async enrollInCourse(req: Request, res: Response): Promise<void> {
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

			const enrollment = await this.enrollmentService.createEnrollment(userId, {
				courseId,
			});

			res.status(201).json({
				success: true,
				data: enrollment,
				message: "Inscripción realizada exitosamente",
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
				if (error.message === "ALREADY_ENROLLED") {
					res.status(409).json({
						success: false,
						error: {
							code: "ALREADY_ENROLLED",
							message: "Ya estás inscrito en este curso",
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
	 * Maneja la petición DELETE /api/enrollments/:id para eliminar una inscripción (desinscribirse).
	 *
	 * @param {Request} req - Objeto de petición de Express (req.params.id contiene el ID de la inscripción)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async deleteEnrollment(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;

			if (!id) {
				res.status(400).json({
					success: false,
					error: {
						code: "INVALID_ENROLLMENT_ID",
						message: "ID de inscripción requerido",
					},
				});
				return;
			}

			await this.enrollmentService.deleteEnrollment(id);

			res.status(200).json({
				success: true,
				message: "Inscripción eliminada exitosamente",
			});
		} catch (error) {
			if (error instanceof Error) {
				if (error.message === "ENROLLMENT_NOT_FOUND") {
					res.status(404).json({
						success: false,
						error: {
							code: "ENROLLMENT_NOT_FOUND",
							message: "Inscripción no encontrada",
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
	 * Maneja la petición GET /api/enrollments/courses/:courseId para verificar si un usuario está inscrito en un curso.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.params.courseId contiene el ID del curso)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async isUserEnrolledInCourse(req: Request, res: Response): Promise<void> {
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

			const enrolled =
				await this.enrollmentService.isUserEnrolledInCourse(userId, courseId);

			res.status(200).json({
				success: true,
				data: {
					enrolled,
				},
			});
		} catch (error) {
			if (error instanceof Error && error.message === "UNAUTHORIZED") {
				res.status(401).json({
					success: false,
					error: {
						code: "UNAUTHORIZED",
						message: "No autenticado",
					},
				});
				return;
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
