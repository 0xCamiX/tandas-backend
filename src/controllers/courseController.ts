import type { Request, Response } from "express";
import type { CourseService } from "../services/courseService";
import type { CourseFilters } from "../types/course.types";

export class CourseController {
	constructor(private readonly courseService: CourseService) {}

	/**
	 * Maneja la petición GET /api/courses para obtener todos los cursos con filtros opcionales.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.query contiene los filtros)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async getAllCourses(req: Request, res: Response): Promise<void> {
		try {
			const filters: CourseFilters = {};

			if (req.query.status) {
				filters.status = req.query.status as CourseFilters["status"];
			}

			if (req.query.category) {
				filters.category = req.query.category as string;
			}

			if (req.query.level) {
				filters.level = req.query.level as CourseFilters["level"];
			}

			if (req.query.search) {
				filters.search = req.query.search as string;
			}

			const courses = await this.courseService.getAllCourses(filters);

			res.status(200).json({
				success: true,
				data: courses,
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
	 * Maneja la petición GET /api/courses/:id para obtener un curso por su ID.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.params.id contiene el ID del curso)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async getCourseById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;

			if (!id) {
				res.status(400).json({
					success: false,
					error: {
						code: "INVALID_COURSE_ID",
						message: "ID de curso requerido",
					},
				});
				return;
			}

			const course = await this.courseService.getCourseById(id);

			res.status(200).json({
				success: true,
				data: course,
			});
		} catch (error) {
			if (error instanceof Error) {
				if (error.message === "COURSE_NOT_FOUND") {
					res.status(404).json({
						success: false,
						error: {
							code: "COURSE_NOT_FOUND",
							message: "Curso no encontrado",
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
	 * Maneja la petición GET /api/courses/:courseId/modules para obtener un curso con sus módulos.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.params.courseId contiene el ID del curso)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async getCourseWithModules(req: Request, res: Response): Promise<void> {
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

			const course =
				await this.courseService.getCourseByIdWithModules(courseId);

			res.status(200).json({
				success: true,
				data: course,
			});
		} catch (error) {
			if (error instanceof Error) {
				if (error.message === "COURSE_NOT_FOUND") {
					res.status(404).json({
						success: false,
						error: {
							code: "COURSE_NOT_FOUND",
							message: "Curso no encontrado",
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
	 * Maneja la petición POST /api/courses para crear un nuevo curso.
	 * El body de la petición debe estar validado previamente por el middleware de validación.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.body contiene los datos validados)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async createCourse(req: Request, res: Response): Promise<void> {
		try {
			const course = await this.courseService.createCourse(req.body);

			res.status(201).json({
				success: true,
				data: course,
				message: "Curso creado exitosamente",
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
	 * Maneja la petición PUT /api/courses/:id para actualizar un curso.
	 * El body de la petición debe estar validado previamente por el middleware de validación.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.params.id contiene el ID del curso, req.body contiene los datos validados)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async updateCourse(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;

			if (!id) {
				res.status(400).json({
					success: false,
					error: {
						code: "INVALID_COURSE_ID",
						message: "ID de curso requerido",
					},
				});
				return;
			}

			const course = await this.courseService.updateCourse(id, req.body);

			res.status(200).json({
				success: true,
				data: course,
				message: "Curso actualizado exitosamente",
			});
		} catch (error) {
			if (error instanceof Error) {
				if (error.message === "COURSE_NOT_FOUND") {
					res.status(404).json({
						success: false,
						error: {
							code: "COURSE_NOT_FOUND",
							message: "Curso no encontrado",
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
	 * Maneja la petición DELETE /api/courses/:id para eliminar un curso.
	 *
	 * @param {Request} req - Objeto de petición de Express (req.params.id contiene el ID del curso)
	 * @param {Response} res - Objeto de respuesta de Express
	 * @returns {Promise<void>} No retorna valor, envía respuesta HTTP
	 */
	async deleteCourse(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;

			if (!id) {
				res.status(400).json({
					success: false,
					error: {
						code: "INVALID_COURSE_ID",
						message: "ID de curso requerido",
					},
				});
				return;
			}

			await this.courseService.deleteCourse(id);

			res.status(200).json({
				success: true,
				message: "Curso eliminado exitosamente",
			});
		} catch (error) {
			if (error instanceof Error) {
				if (error.message === "COURSE_NOT_FOUND") {
					res.status(404).json({
						success: false,
						error: {
							code: "COURSE_NOT_FOUND",
							message: "Curso no encontrado",
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
