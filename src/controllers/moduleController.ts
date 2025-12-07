import type { Request, Response } from "express";
import type { ModuleService } from "../services/moduleService";
import type { ModuleFilters } from "../types/module.types";

export class ModuleController {
	constructor(private readonly moduleService: ModuleService) {}

	/**
	 * Maneja la petición GET /api/modules para obtener todos los módulos con filtros opcionales.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.query contiene los filtros)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async getAllModules(req: Request, res: Response): Promise<void> {
		try {
			const filters: ModuleFilters = {};

			if (req.query.courseId) {
				filters.courseId = req.query.courseId as string;
			}

			const modules = await this.moduleService.getAllModules(filters);

			res.status(200).json({
				success: true,
				data: modules,
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
	 * Maneja la petición GET /api/courses/:courseId/modules para obtener todos los módulos de un curso.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.params.courseId contiene el ID del curso)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async getModulesByCourseId(req: Request, res: Response): Promise<void> {
		try {
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

			const modules = await this.moduleService.getModulesByCourseId(courseId);

			res.status(200).json({
				success: true,
				data: modules,
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
	 * Maneja la petición GET /api/modules/:id para obtener un módulo por su ID.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.params.id contiene el ID del módulo)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async getModuleById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;

			if (!id) {
				res.status(400).json({
					success: false,
					error: {
						code: "INVALID_MODULE_ID",
						message: "ID de módulo requerido",
					},
				});
				return;
			}

			const module = await this.moduleService.getModuleById(id);

			res.status(200).json({
				success: true,
				data: module,
			});
		} catch (error) {
			if (error instanceof Error) {
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
	 * Maneja la petición GET /api/modules/:id/full para obtener un módulo con sus relaciones.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.params.id contiene el ID del módulo)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async getModuleWithRelations(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;

			if (!id) {
				res.status(400).json({
					success: false,
					error: {
						code: "INVALID_MODULE_ID",
						message: "ID de módulo requerido",
					},
				});
				return;
			}

			const module = await this.moduleService.getModuleByIdWithRelations(id);

			res.status(200).json({
				success: true,
				data: module,
			});
		} catch (error) {
			if (error instanceof Error) {
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
	 * Maneja la petición POST /api/modules para crear un nuevo módulo.
	 * El body de la petición debe estar validado previamente por el middleware de validación.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.body contiene los datos validados)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async createModule(req: Request, res: Response): Promise<void> {
		try {
			const module = await this.moduleService.createModule(req.body);

			res.status(201).json({
				success: true,
				data: module,
				message: "Módulo creado exitosamente",
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
	 * Maneja la petición PUT /api/modules/:id para actualizar un módulo.
	 * El body de la petición debe estar validado previamente por el middleware de validación.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.params.id contiene el ID del módulo, req.body contiene los datos validados)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async updateModule(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;

			if (!id) {
				res.status(400).json({
					success: false,
					error: {
						code: "INVALID_MODULE_ID",
						message: "ID de módulo requerido",
					},
				});
				return;
			}

			const module = await this.moduleService.updateModule(id, req.body);

			res.status(200).json({
				success: true,
				data: module,
				message: "Módulo actualizado exitosamente",
			});
		} catch (error) {
			if (error instanceof Error) {
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
	 * Maneja la petición DELETE /api/modules/:id para eliminar un módulo.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.params.id contiene el ID del módulo)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async deleteModule(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;

			if (!id) {
				res.status(400).json({
					success: false,
					error: {
						code: "INVALID_MODULE_ID",
						message: "ID de módulo requerido",
					},
				});
				return;
			}

			await this.moduleService.deleteModule(id);

			res.status(200).json({
				success: true,
				message: "Módulo eliminado exitosamente",
			});
		} catch (error) {
			if (error instanceof Error) {
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
