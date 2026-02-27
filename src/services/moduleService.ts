import type { ModuleModel } from "../models/moduleModel";
import type {
	CreateModuleDto,
	ModuleFilters,
	ModuleResponse,
	ModuleWithRelationsResponse,
	UpdateModuleDto,
} from "../types/module.types";

export class ModuleService {
	constructor(private readonly moduleModel: ModuleModel) {}

	/**
	 * Obtiene todos los módulos aplicando filtros opcionales.
	 *
	 * @param {ModuleFilters} [filters] - Filtros opcionales para buscar módulos
	 * @returns {Promise<ModuleResponse[]>} Array de módulos que coinciden con los filtros
	 */
	async getAllModules(filters?: ModuleFilters): Promise<ModuleResponse[]> {
		return this.moduleModel.findAll(filters);
	}

	/**
	 * Obtiene todos los módulos de un curso específico.
	 *
	 * @param {string} courseId - Identificador único del curso (UUID)
	 * @returns {Promise<ModuleResponse[]>} Array de módulos del curso
	 */
	async getModulesByCourseId(courseId: string): Promise<ModuleResponse[]> {
		return this.moduleModel.findByCourseId(courseId);
	}

	/**
	 * Obtiene un módulo por su ID.
	 *
	 * @param {string} moduleId - Identificador único del módulo (UUID)
	 * @returns {Promise<ModuleResponse>} Módulo encontrado
	 * @throws {Error} Si el módulo no existe (código: "MODULE_NOT_FOUND")
	 */
	async getModuleById(moduleId: string): Promise<ModuleResponse> {
		const module = await this.moduleModel.findById(moduleId);

		if (!module) {
			throw new Error("MODULE_NOT_FOUND");
		}

		return module;
	}

	/**
	 * Obtiene un módulo por su ID incluyendo sus relaciones.
	 *
	 * @param {string} moduleId - Identificador único del módulo (UUID)
	 * @returns {Promise<ModuleWithRelationsResponse>} Módulo con relaciones
	 * @throws {Error} Si el módulo no existe (código: "MODULE_NOT_FOUND")
	 */
	async getModuleByIdWithRelations(
		moduleId: string
	): Promise<ModuleWithRelationsResponse> {
		const module = await this.moduleModel.findByIdWithRelations(moduleId);

		if (!module) {
			throw new Error("MODULE_NOT_FOUND");
		}

		return module;
	}

	/**
	 * Crea un nuevo módulo. Los datos deben estar validados previamente por el middleware de validación.
	 *
	 * @param {CreateModuleDto} data - Datos del módulo a crear
	 * @returns {Promise<ModuleResponse>} Módulo creado
	 */
	async createModule(data: CreateModuleDto): Promise<ModuleResponse> {
		return this.moduleModel.create({
			course: {
				connect: {
					id: data.courseId,
				},
			},
			title: data.title,
			content: data.content,
			videoUrl: data.videoUrl,
			authorNote: data.authorNote,
			order: data.order ?? 0,
			duration: data.duration ?? null,
		});
	}

	/**
	 * Actualiza un módulo. Los datos deben estar validados previamente por el middleware de validación.
	 *
	 * @param {string} moduleId - Identificador único del módulo (UUID)
	 * @param {UpdateModuleDto} data - Datos a actualizar del módulo
	 * @returns {Promise<ModuleResponse>} Módulo actualizado
	 * @throws {Error} Si el módulo no existe (código: "MODULE_NOT_FOUND")
	 */
	async updateModule(
		moduleId: string,
		data: UpdateModuleDto
	): Promise<ModuleResponse> {
		const exists = await this.moduleModel.exists(moduleId);
		if (!exists) {
			throw new Error("MODULE_NOT_FOUND");
		}

		const updateData: {
			title?: string;
			content?: string | null;
			videoUrl?: string | null;
			authorNote?: string | null;
			order?: number;
			duration?: number | null;
			updatedAt: Date;
		} = {
			updatedAt: new Date(),
		};

		if (data.title !== undefined) {
			updateData.title = data.title;
		}

		if (data.content !== undefined) {
			updateData.content = data.content || null;
		}

		if (data.videoUrl !== undefined) {
			updateData.videoUrl = data.videoUrl || null;
		}

		if (data.authorNote !== undefined) {
			updateData.authorNote = data.authorNote || null;
		}

		if (data.order !== undefined) {
			updateData.order = data.order;
		}

		if (data.duration !== undefined) {
			updateData.duration = data.duration ?? null;
		}

		return this.moduleModel.update(moduleId, updateData);
	}

	/**
	 * Elimina un módulo.
	 *
	 * @param {string} moduleId - Identificador único del módulo (UUID)
	 * @returns {Promise<void>} No retorna valor
	 * @throws {Error} Si el módulo no existe (código: "MODULE_NOT_FOUND")
	 */
	async deleteModule(moduleId: string): Promise<void> {
		const exists = await this.moduleModel.exists(moduleId);
		if (!exists) {
			throw new Error("MODULE_NOT_FOUND");
		}

		await this.moduleModel.delete(moduleId);
	}
}
