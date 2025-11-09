import { prisma } from "../db/prisma";
import type { ModuleCompletion, Prisma } from "../generated/prisma/client";
import type {
	ModuleCompletionFilters,
	ModuleCompletionResponse,
	ModuleCompletionWithDetailsResponse,
} from "../types/moduleCompletion.types";

export class ModuleCompletionModel {
	/**
	 * Obtiene todas las completaciones aplicando filtros opcionales.
	 *
	 * @param {ModuleCompletionFilters} [filters] - Filtros opcionales para buscar completaciones
	 * @returns {Promise<ModuleCompletionResponse[]>} Array de completaciones que coinciden con los filtros
	 */
	async findAll(
		filters?: ModuleCompletionFilters
	): Promise<ModuleCompletionResponse[]> {
		const where: Prisma.ModuleCompletionWhereInput = {};

		if (filters?.userId) {
			where.userId = filters.userId;
		}

		if (filters?.moduleId) {
			where.moduleId = filters.moduleId;
		}

		if (filters?.courseId) {
			where.module = {
				courseId: filters.courseId,
			};
		}

		const completions = await prisma.moduleCompletion.findMany({
			where,
			orderBy: {
				completedAt: "desc",
			},
		});

		return completions.map(this.mapToResponse);
	}

	/**
	 * Obtiene todas las completaciones de un usuario específico.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @returns {Promise<ModuleCompletionResponse[]>} Array de completaciones del usuario
	 */
	async findByUserId(userId: string): Promise<ModuleCompletionResponse[]> {
		const completions = await prisma.moduleCompletion.findMany({
			where: { userId },
			orderBy: {
				completedAt: "desc",
			},
		});

		return completions.map(this.mapToResponse);
	}

	/**
	 * Obtiene todas las completaciones de un módulo específico.
	 *
	 * @param {string} moduleId - Identificador único del módulo (UUID)
	 * @returns {Promise<ModuleCompletionResponse[]>} Array de completaciones del módulo
	 */
	async findByModuleId(moduleId: string): Promise<ModuleCompletionResponse[]> {
		const completions = await prisma.moduleCompletion.findMany({
			where: { moduleId },
			orderBy: {
				completedAt: "desc",
			},
		});

		return completions.map(this.mapToResponse);
	}

	/**
	 * Obtiene una completación por userId y moduleId.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @param {string} moduleId - Identificador único del módulo (UUID)
	 * @returns {Promise<ModuleCompletionResponse | null>} Completación o null si no existe
	 */
	async findByUserAndModule(
		userId: string,
		moduleId: string
	): Promise<ModuleCompletionResponse | null> {
		const completion = await prisma.moduleCompletion.findUnique({
			where: {
				userId_moduleId: {
					userId,
					moduleId,
				},
			},
		});

		if (!completion) {
			return null;
		}

		return this.mapToResponse(completion);
	}

	/**
	 * Obtiene una completación por su ID incluyendo sus relaciones.
	 *
	 * @param {string} completionId - Identificador único de la completación (UUID)
	 * @returns {Promise<ModuleCompletionWithDetailsResponse | null>} Completación con relaciones o null si no existe
	 */
	async findByIdWithDetails(
		completionId: string
	): Promise<ModuleCompletionWithDetailsResponse | null> {
		const completion = await prisma.moduleCompletion.findUnique({
			where: { id: completionId },
			include: {
				module: {
					select: {
						id: true,
						title: true,
						courseId: true,
					},
				},
			},
		});

		if (!completion) {
			return null;
		}

		return {
			...this.mapToResponse(completion),
			module: completion.module,
		};
	}

	/**
	 * Crea una nueva completación en la base de datos.
	 *
	 * @param {Prisma.ModuleCompletionCreateInput} data - Datos de la completación a crear
	 * @returns {Promise<ModuleCompletionResponse>} Completación creada
	 */
	async create(
		data: Prisma.ModuleCompletionCreateInput
	): Promise<ModuleCompletionResponse> {
		const completion = await prisma.moduleCompletion.create({
			data,
		});

		return this.mapToResponse(completion);
	}

	/**
	 * Elimina una completación de la base de datos.
	 *
	 * @param {string} completionId - Identificador único de la completación (UUID)
	 * @returns {Promise<void>} No retorna valor
	 * @throws {Error} Si la completación no existe
	 */
	async delete(completionId: string): Promise<void> {
		await prisma.moduleCompletion.delete({
			where: { id: completionId },
		});
	}

	/**
	 * Verifica si una completación existe.
	 *
	 * @param {string} completionId - Identificador único de la completación (UUID)
	 * @returns {Promise<boolean>} true si existe, false si no
	 */
	async exists(completionId: string): Promise<boolean> {
		const count = await prisma.moduleCompletion.count({
			where: { id: completionId },
		});

		return count > 0;
	}

	/**
	 * Verifica si un usuario ya completó un módulo.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @param {string} moduleId - Identificador único del módulo (UUID)
	 * @returns {Promise<boolean>} true si está completado, false si no
	 */
	async isModuleCompleted(userId: string, moduleId: string): Promise<boolean> {
		const count = await prisma.moduleCompletion.count({
			where: {
				userId,
				moduleId,
			},
		});

		return count > 0;
	}

	/**
	 * Obtiene el número de módulos completados por un usuario en un curso específico.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @param {string} courseId - Identificador único del curso (UUID)
	 * @returns {Promise<number>} Número de módulos completados
	 */
	async getCompletedModulesCountByCourse(
		userId: string,
		courseId: string
	): Promise<number> {
		return prisma.moduleCompletion.count({
			where: {
				userId,
				module: {
					courseId,
				},
			},
		});
	}

	/**
	 * Mapea un modelo de Prisma a un ModuleCompletionResponse.
	 *
	 * @private
	 * @param {ModuleCompletion} completion - Completación de Prisma
	 * @returns {ModuleCompletionResponse} Completación mapeada
	 */
	private mapToResponse(
		completion: ModuleCompletion
	): ModuleCompletionResponse {
		return {
			id: completion.id,
			userId: completion.userId,
			moduleId: completion.moduleId,
			completedAt: completion.completedAt,
			createdAt: completion.createdAt,
			updatedAt: completion.updatedAt,
		};
	}
}
