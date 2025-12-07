import { type CourseLevel, CourseStatus } from "../generated/prisma/client";
import type { CourseModel } from "../models/courseModel";
import type {
	CourseFilters,
	CourseResponse,
	CourseWithModulesResponse,
	CreateCourseDto,
	UpdateCourseDto,
} from "../types/course.types";

export class CourseService {
	constructor(private readonly courseModel: CourseModel) {}

	/**
	 * Obtiene todos los cursos aplicando filtros opcionales.
	 *
	 * @param {CourseFilters} [filters] - Filtros opcionales para buscar cursos
	 * @returns {Promise<CourseResponse[]>} Array de cursos que coinciden con los filtros
	 */
	async getAllCourses(filters?: CourseFilters): Promise<CourseResponse[]> {
		return this.courseModel.findAll(filters);
	}

	/**
	 * Obtiene un curso por su ID.
	 *
	 * @param {string} courseId - Identificador único del curso (UUID)
	 * @returns {Promise<CourseResponse>} Curso encontrado
	 * @throws {Error} Si el curso no existe (código: "COURSE_NOT_FOUND")
	 */
	async getCourseById(courseId: string): Promise<CourseResponse> {
		const course = await this.courseModel.findById(courseId);

		if (!course) {
			throw new Error("COURSE_NOT_FOUND");
		}

		return course;
	}

	/**
	 * Obtiene un curso por su ID incluyendo sus módulos.
	 *
	 * @param {string} courseId - Identificador único del curso (UUID)
	 * @returns {Promise<CourseWithModulesResponse>} Curso con módulos
	 * @throws {Error} Si el curso no existe (código: "COURSE_NOT_FOUND")
	 */
	async getCourseByIdWithModules(
		courseId: string
	): Promise<CourseWithModulesResponse> {
		const course = await this.courseModel.findByIdWithModules(courseId);

		if (!course) {
			throw new Error("COURSE_NOT_FOUND");
		}

		return course;
	}

	/**
	 * Crea un nuevo curso. Los datos deben estar validados previamente por el middleware de validación.
	 *
	 * @param {CreateCourseDto} data - Datos del curso a crear
	 * @returns {Promise<CourseResponse>} Curso creado
	 */
	async createCourse(data: CreateCourseDto): Promise<CourseResponse> {
		return this.courseModel.create({
			title: data.title,
			description: data.description,
			imageUrl: data.imageUrl,
			category: data.category,
			level: data.level,
			status: data.status || CourseStatus.INACTIVO,
		});
	}

	/**
	 * Actualiza un curso. Los datos deben estar validados previamente por el middleware de validación.
	 *
	 * @param {string} courseId - Identificador único del curso (UUID)
	 * @param {UpdateCourseDto} data - Datos a actualizar del curso
	 * @returns {Promise<CourseResponse>} Curso actualizado
	 * @throws {Error} Si el curso no existe (código: "COURSE_NOT_FOUND")
	 */
	async updateCourse(
		courseId: string,
		data: UpdateCourseDto
	): Promise<CourseResponse> {
		const exists = await this.courseModel.exists(courseId);
		if (!exists) {
			throw new Error("COURSE_NOT_FOUND");
		}

		const updateData: {
			title?: string;
			description?: string | null;
			imageUrl?: string | null;
			category?: string;
			level?: CourseLevel;
			status?: CourseStatus;
			updatedAt: Date;
		} = {
			updatedAt: new Date(),
		};

		if (data.title !== undefined) {
			updateData.title = data.title;
		}

		if (data.description !== undefined) {
			updateData.description = data.description || null;
		}

		if (data.imageUrl !== undefined) {
			updateData.imageUrl = data.imageUrl || null;
		}

		if (data.category !== undefined) {
			updateData.category = data.category;
		}

		if (data.level !== undefined) {
			updateData.level = data.level;
		}

		if (data.status !== undefined) {
			updateData.status = data.status;
		}

		return this.courseModel.update(courseId, updateData);
	}

	/**
	 * Elimina un curso.
	 *
	 * @param {string} courseId - Identificador único del curso (UUID)
	 * @returns {Promise<void>} No retorna valor
	 * @throws {Error} Si el curso no existe (código: "COURSE_NOT_FOUND")
	 */
	async deleteCourse(courseId: string): Promise<void> {
		const exists = await this.courseModel.exists(courseId);
		if (!exists) {
			throw new Error("COURSE_NOT_FOUND");
		}

		await this.courseModel.delete(courseId);
	}
}
