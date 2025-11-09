import type { Request, Response } from "express";
import type { ModuleCompletionService } from "../services/moduleCompletionService";
import type { ModuleCompletionFilters } from "../types/moduleCompletion.types";

export class ModuleCompletionController {
	constructor(
		private readonly moduleCompletionService: ModuleCompletionService
	) {}

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
	 * Maneja la petición GET /api/module-completions para obtener todas las completaciones con filtros opcionales.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.query contiene los filtros)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async getAllCompletions(req: Request, res: Response): Promise<void> {
		try {
			const filters: ModuleCompletionFilters = {};

			if (req.query.userId) {
				filters.userId = req.query.userId as string;
			}

			if (req.query.moduleId) {
				filters.moduleId = req.query.moduleId as string;
			}

			if (req.query.courseId) {
				filters.courseId = req.query.courseId as string;
			}

			const completions =
				await this.moduleCompletionService.getAllCompletions(filters);

			res.status(200).json({
				success: true,
				data: completions,
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
	 * Maneja la petición GET /api/module-completions/me para obtener todas las completaciones del usuario actual.
	 *
	 * @param {Request} req - Objeto de petición de Express
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async getMyCompletions(req: Request, res: Response): Promise<void> {
		try {
			const userId = this.getCurrentUserId(req);
			const completions =
				await this.moduleCompletionService.getCompletionsByUserId(userId);

			res.status(200).json({
				success: true,
				data: completions,
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
	 * Maneja la petición POST /api/module-completions/modules/:moduleId para marcar un módulo como completado.
	 * El usuario se obtiene del token de autenticación.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.params.moduleId contiene el ID del módulo)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async completeModule(req: Request, res: Response): Promise<void> {
		try {
			const userId = this.getCurrentUserId(req);
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

			const completion =
				await this.moduleCompletionService.createModuleCompletion(userId, {
					moduleId,
				});

			res.status(201).json({
				success: true,
				data: completion,
				message: "Módulo completado exitosamente",
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
				if (error.message === "ALREADY_COMPLETED") {
					res.status(409).json({
						success: false,
						error: {
							code: "ALREADY_COMPLETED",
							message: "Ya completaste este módulo",
						},
					});
					return;
				}
				if (error.message === "MODULE_NOT_FOUND") {
					res.status(404).json({
						success: false,
						error: {
							code: "MODULE_NOT_FOUND",
							message: "Módulo no encontrado",
						},
					});
					return;
				}
				if (error.message === "NOT_ENROLLED") {
					res.status(403).json({
						success: false,
						error: {
							code: "NOT_ENROLLED",
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
	 * Maneja la petición DELETE /api/module-completions/:id para eliminar una completación (desmarcar módulo como completado).
	 *
	 * @param {Request} req - Objeto de petición de Express (req.params.id contiene el ID de la completación)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async deleteCompletion(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;

			if (!id) {
				res.status(400).json({
					success: false,
					error: {
						code: "INVALID_COMPLETION_ID",
						message: "ID de completación requerido",
					},
				});
				return;
			}

			await this.moduleCompletionService.deleteModuleCompletion(id);

			res.status(200).json({
				success: true,
				message: "Completación eliminada exitosamente",
			});
		} catch (error) {
			if (error instanceof Error) {
				if (error.message === "COMPLETION_NOT_FOUND") {
					res.status(404).json({
						success: false,
						error: {
							code: "COMPLETION_NOT_FOUND",
							message: "Completación no encontrada",
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
