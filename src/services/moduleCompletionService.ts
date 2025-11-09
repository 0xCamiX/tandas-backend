import { prisma } from "../db/prisma";
import type { ModuleCompletionModel } from "../models/moduleCompletionModel";
import type {
	CreateModuleCompletionDto,
	ModuleCompletionFilters,
	ModuleCompletionResponse,
	ModuleCompletionWithDetailsResponse,
} from "../types/moduleCompletion.types";

export class ModuleCompletionService {
	constructor(private readonly moduleCompletionModel: ModuleCompletionModel) {}

	/**
	 * Obtiene todas las completaciones aplicando filtros opcionales.
	 *
	 * @param {ModuleCompletionFilters} [filters] - Filtros opcionales para buscar completaciones
	 * @returns {Promise<ModuleCompletionResponse[]>} Array de completaciones que coinciden con los filtros
	 */
	async getAllCompletions(
		filters?: ModuleCompletionFilters
	): Promise<ModuleCompletionResponse[]> {
		return this.moduleCompletionModel.findAll(filters);
	}

	/**
	 * Obtiene todas las completaciones de un usuario específico.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @returns {Promise<ModuleCompletionResponse[]>} Array de completaciones del usuario
	 */
	async getCompletionsByUserId(
		userId: string
	): Promise<ModuleCompletionResponse[]> {
		return this.moduleCompletionModel.findByUserId(userId);
	}

	/**
	 * Obtiene una completación por su ID incluyendo sus relaciones.
	 *
	 * @param {string} completionId - Identificador único de la completación (UUID)
	 * @returns {Promise<ModuleCompletionWithDetailsResponse>} Completación con relaciones
	 * @throws {Error} Si la completación no existe (código: "COMPLETION_NOT_FOUND")
	 */
	async getCompletionByIdWithDetails(
		completionId: string
	): Promise<ModuleCompletionWithDetailsResponse> {
		const completion =
			await this.moduleCompletionModel.findByIdWithDetails(completionId);

		if (!completion) {
			throw new Error("COMPLETION_NOT_FOUND");
		}

		return completion;
	}

	/**
	 * Crea una nueva completación de módulo y actualiza el progreso del curso.
	 * Los datos deben estar validados previamente por el middleware de validación.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @param {CreateModuleCompletionDto} data - Datos de la completación a crear
	 * @returns {Promise<ModuleCompletionResponse>} Completación creada
	 * @throws {Error} Si el usuario ya completó el módulo (código: "ALREADY_COMPLETED")
	 * @throws {Error} Si el módulo no existe (código: "MODULE_NOT_FOUND")
	 * @throws {Error} Si el usuario no está inscrito en el curso (código: "NOT_ENROLLED")
	 */
	async createModuleCompletion(
		userId: string,
		data: CreateModuleCompletionDto
	): Promise<ModuleCompletionResponse> {
		// Verificar si el usuario ya completó el módulo
		const isCompleted = await this.moduleCompletionModel.isModuleCompleted(
			userId,
			data.moduleId
		);

		if (isCompleted) {
			throw new Error("ALREADY_COMPLETED");
		}

		// Obtener el módulo para verificar que existe y obtener el courseId
		const module = await prisma.module.findUnique({
			where: { id: data.moduleId },
			include: {
				course: {
					include: {
						modules: true,
					},
				},
			},
		});

		if (!module) {
			throw new Error("MODULE_NOT_FOUND");
		}

		// Verificar que el usuario está inscrito en el curso
		const enrollment = await prisma.enrollment.findUnique({
			where: {
				userId_courseId: {
					userId,
					courseId: module.courseId,
				},
			},
		});

		if (!enrollment) {
			throw new Error("NOT_ENROLLED");
		}

		// Crear la completación del módulo
		const completion = await this.moduleCompletionModel.create({
			user: {
				connect: {
					id: userId,
				},
			},
			module: {
				connect: {
					id: data.moduleId,
				},
			},
		});

		// Calcular el progreso del curso
		const totalModules = module.course.modules.length;
		const completedModules =
			await this.moduleCompletionModel.getCompletedModulesCountByCourse(
				userId,
				module.courseId
			);
		const progress = totalModules > 0 ? completedModules / totalModules : 0;

		// Actualizar el progreso de la inscripción
		const updateData: {
			progress: number;
			completedAt?: Date;
			updatedAt: Date;
		} = {
			progress,
			updatedAt: new Date(),
		};

		// Si todos los módulos están completados, marcar el curso como completado
		if (completedModules >= totalModules && totalModules > 0) {
			updateData.completedAt = new Date();
		}

		await prisma.enrollment.update({
			where: {
				userId_courseId: {
					userId,
					courseId: module.courseId,
				},
			},
			data: updateData,
		});

		return completion;
	}

	/**
	 * Elimina una completación de módulo y actualiza el progreso del curso.
	 *
	 * @param {string} completionId - Identificador único de la completación (UUID)
	 * @returns {Promise<void>} No retorna valor
	 * @throws {Error} Si la completación no existe (código: "COMPLETION_NOT_FOUND")
	 */
	async deleteModuleCompletion(completionId: string): Promise<void> {
		// Obtener la completación con información del módulo y curso
		const completion = await prisma.moduleCompletion.findUnique({
			where: { id: completionId },
			include: {
				module: {
					include: {
						course: {
							include: {
								modules: true,
							},
						},
					},
				},
			},
		});

		if (!completion) {
			throw new Error("COMPLETION_NOT_FOUND");
		}

		const { userId, module } = completion;
		const { courseId } = module;

		// Eliminar la completación
		await this.moduleCompletionModel.delete(completionId);

		// Recalcular el progreso del curso
		const totalModules = module.course.modules.length;
		const completedModules =
			await this.moduleCompletionModel.getCompletedModulesCountByCourse(
				userId,
				courseId
			);
		const progress = totalModules > 0 ? completedModules / totalModules : 0;

		// Actualizar el progreso de la inscripción
		const updateData: {
			progress: number;
			completedAt: Date | null;
			updatedAt: Date;
		} = {
			progress,
			completedAt: null, // Si se elimina una completación, el curso ya no está completado
			updatedAt: new Date(),
		};

		await prisma.enrollment.update({
			where: {
				userId_courseId: {
					userId,
					courseId,
				},
			},
			data: updateData,
		});
	}

	/**
	 * Obtiene una completación por userId y moduleId.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @param {string} moduleId - Identificador único del módulo (UUID)
	 * @returns {Promise<ModuleCompletionResponse | null>} Completación o null si no existe
	 */
	async getCompletionByUserAndModule(
		userId: string,
		moduleId: string
	): Promise<ModuleCompletionResponse | null> {
		return this.moduleCompletionModel.findByUserAndModule(userId, moduleId);
	}
}
