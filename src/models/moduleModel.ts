import { prisma } from "../db/prisma";
import type { Module, Prisma } from "../generated/prisma/client";
import type {
	ModuleFilters,
	ModuleResponse,
	ModuleWithRelationsResponse,
} from "../types/module.types";

export class ModuleModel {
	/**
	 * Obtiene todos los módulos aplicando filtros opcionales.
	 *
	 * @param {ModuleFilters} [filters] - Filtros opcionales para buscar módulos
	 * @returns {Promise<ModuleResponse[]>} Array de módulos que coinciden con los filtros
	 */
	async findAll(filters?: ModuleFilters): Promise<ModuleResponse[]> {
		const where: Prisma.ModuleWhereInput = {};

		if (filters?.courseId) {
			where.courseId = filters.courseId;
		}

		const modules = await prisma.module.findMany({
			where,
			orderBy: [
				{
					courseId: "asc",
				},
				{
					order: "asc",
				},
			],
		});

		return modules.map(this.mapToResponse);
	}

	/**
	 * Obtiene todos los módulos de un curso específico.
	 *
	 * @param {string} courseId - Identificador único del curso (UUID)
	 * @returns {Promise<ModuleResponse[]>} Array de módulos del curso
	 */
	async findByCourseId(courseId: string): Promise<ModuleResponse[]> {
		const modules = await prisma.module.findMany({
			where: { courseId },
			orderBy: {
				order: "asc",
			},
		});

		return modules.map(this.mapToResponse);
	}

	/**
	 * Obtiene un módulo por su ID.
	 *
	 * @param {string} moduleId - Identificador único del módulo (UUID)
	 * @returns {Promise<ModuleResponse | null>} Módulo o null si no existe
	 */
	async findById(moduleId: string): Promise<ModuleResponse | null> {
		const module = await prisma.module.findUnique({
			where: { id: moduleId },
		});

		if (!module) {
			return null;
		}

		return this.mapToResponse(module);
	}

	/**
	 * Obtiene un módulo por su ID incluyendo sus relaciones.
	 *
	 * @param {string} moduleId - Identificador único del módulo (UUID)
	 * @returns {Promise<ModuleWithRelationsResponse | null>} Módulo con relaciones o null si no existe
	 */
	async findByIdWithRelations(
		moduleId: string
	): Promise<ModuleWithRelationsResponse | null> {
		const module = await prisma.module.findUnique({
			where: { id: moduleId },
			include: {
				course: {
					select: {
						id: true,
						title: true,
					},
				},
				quizzes: {
					select: {
						id: true,
						question: true,
					},
					orderBy: {
						createdAt: "asc",
					},
				},
				resources: {
					select: {
						id: true,
						resourceType: true,
						url: true,
						title: true,
					},
					orderBy: {
						createdAt: "asc",
					},
				},
			},
		});

		if (!module) {
			return null;
		}

		return {
			...this.mapToResponse(module),
			course: module.course,
			quizzes: module.quizzes,
			resources: module.resources,
		};
	}

	/**
	 * Crea un nuevo módulo en la base de datos.
	 *
	 * @param {Prisma.ModuleCreateInput} data - Datos del módulo a crear
	 * @returns {Promise<ModuleResponse>} Módulo creado
	 */
	async create(data: Prisma.ModuleCreateInput): Promise<ModuleResponse> {
		const module = await prisma.module.create({
			data,
		});

		return this.mapToResponse(module);
	}

	/**
	 * Actualiza un módulo en la base de datos.
	 *
	 * @param {string} moduleId - Identificador único del módulo (UUID)
	 * @param {Prisma.ModuleUpdateInput} data - Datos a actualizar del módulo
	 * @returns {Promise<ModuleResponse>} Módulo actualizado
	 * @throws {Error} Si el módulo no existe
	 */
	async update(
		moduleId: string,
		data: Prisma.ModuleUpdateInput
	): Promise<ModuleResponse> {
		const module = await prisma.module.update({
			where: { id: moduleId },
			data,
		});

		return this.mapToResponse(module);
	}

	/**
	 * Elimina un módulo de la base de datos.
	 *
	 * @param {string} moduleId - Identificador único del módulo (UUID)
	 * @returns {Promise<void>} No retorna valor
	 * @throws {Error} Si el módulo no existe
	 */
	async delete(moduleId: string): Promise<void> {
		await prisma.module.delete({
			where: { id: moduleId },
		});
	}

	/**
	 * Verifica si un módulo existe.
	 *
	 * @param {string} moduleId - Identificador único del módulo (UUID)
	 * @returns {Promise<boolean>} true si existe, false si no
	 */
	async exists(moduleId: string): Promise<boolean> {
		const count = await prisma.module.count({
			where: { id: moduleId },
		});

		return count > 0;
	}

	/**
	 * Mapea un modelo de Prisma a un ModuleResponse.
	 *
	 * @private
	 * @param {Module} module - Módulo de Prisma
	 * @returns {ModuleResponse} Módulo mapeado
	 */
	private mapToResponse(module: Module): ModuleResponse {
		return {
			id: module.id,
			courseId: module.courseId,
			title: module.title,
			content: module.content,
			videoUrl: module.videoUrl,
			authorNote: module.authorNote,
			order: module.order,
			duration: module.duration,
			createdAt: module.createdAt,
			updatedAt: module.updatedAt,
		};
	}
}
