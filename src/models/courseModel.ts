import { prisma } from "../db/prisma";
import type { Course, Prisma } from "../generated/prisma/client";
import type {
	CourseFilters,
	CourseResponse,
	CourseWithModulesResponse,
} from "../types/course.types";

export class CourseModel {
	/**
	 * Obtiene todos los cursos aplicando filtros opcionales.
	 *
	 * @param {CourseFilters} [filters] - Filtros opcionales para buscar cursos
	 * @returns {Promise<CourseResponse[]>} Array de cursos que coinciden con los filtros
	 */
	async findAll(filters?: CourseFilters): Promise<CourseResponse[]> {
		const where: Prisma.CourseWhereInput = {};

		if (filters?.status) {
			where.status = filters.status;
		}

		if (filters?.category) {
			where.category = {
				contains: filters.category,
				mode: "insensitive",
			};
		}

		if (filters?.level) {
			where.level = filters.level;
		}

		if (filters?.search) {
			where.OR = [
				{
					title: {
						contains: filters.search,
						mode: "insensitive",
					},
				},
				{
					description: {
						contains: filters.search,
						mode: "insensitive",
					},
				},
			];
		}

		const courses = await prisma.course.findMany({
			where,
			orderBy: {
				createdAt: "desc",
			},
		});

		return courses.map(this.mapToResponse);
	}

	/**
	 * Obtiene un curso por su ID.
	 *
	 * @param {string} courseId - Identificador único del curso (UUID)
	 * @returns {Promise<CourseResponse | null>} Curso o null si no existe
	 */
	async findById(courseId: string): Promise<CourseResponse | null> {
		const course = await prisma.course.findUnique({
			where: { id: courseId },
		});

		if (!course) {
			return null;
		}

		return this.mapToResponse(course);
	}

	/**
	 * Obtiene un curso por su ID incluyendo sus módulos.
	 *
	 * @param {string} courseId - Identificador único del curso (UUID)
	 * @returns {Promise<CourseWithModulesResponse | null>} Curso con módulos o null si no existe
	 */
	async findByIdWithModules(
		courseId: string
	): Promise<CourseWithModulesResponse | null> {
		const course = await prisma.course.findUnique({
			where: { id: courseId },
			include: {
				modules: {
					orderBy: {
						order: "asc",
					},
					select: {
						id: true,
						title: true,
						order: true,
						duration: true,
					},
				},
			},
		});

		if (!course) {
			return null;
		}

		return {
			...this.mapToResponse(course),
			modules: course.modules,
		};
	}

	/**
	 * Crea un nuevo curso en la base de datos.
	 *
	 * @param {Prisma.CourseCreateInput} data - Datos del curso a crear
	 * @returns {Promise<CourseResponse>} Curso creado
	 */
	async create(data: Prisma.CourseCreateInput): Promise<CourseResponse> {
		const course = await prisma.course.create({
			data,
		});

		return this.mapToResponse(course);
	}

	/**
	 * Actualiza un curso en la base de datos.
	 *
	 * @param {string} courseId - Identificador único del curso (UUID)
	 * @param {Prisma.CourseUpdateInput} data - Datos a actualizar del curso
	 * @returns {Promise<CourseResponse>} Curso actualizado
	 * @throws {Error} Si el curso no existe
	 */
	async update(
		courseId: string,
		data: Prisma.CourseUpdateInput
	): Promise<CourseResponse> {
		const course = await prisma.course.update({
			where: { id: courseId },
			data,
		});

		return this.mapToResponse(course);
	}

	/**
	 * Elimina un curso de la base de datos.
	 *
	 * @param {string} courseId - Identificador único del curso (UUID)
	 * @returns {Promise<void>} No retorna valor
	 * @throws {Error} Si el curso no existe
	 */
	async delete(courseId: string): Promise<void> {
		await prisma.course.delete({
			where: { id: courseId },
		});
	}

	/**
	 * Verifica si un curso existe.
	 *
	 * @param {string} courseId - Identificador único del curso (UUID)
	 * @returns {Promise<boolean>} true si existe, false si no
	 */
	async exists(courseId: string): Promise<boolean> {
		const count = await prisma.course.count({
			where: { id: courseId },
		});

		return count > 0;
	}

	/**
	 * Mapea un modelo de Prisma a un CourseResponse.
	 *
	 * @private
	 * @param {Course} course - Curso de Prisma
	 * @returns {CourseResponse} Curso mapeado
	 */
	private mapToResponse(course: Course): CourseResponse {
		return {
			id: course.id,
			title: course.title,
			description: course.description,
			imageUrl: course.imageUrl,
			category: course.category,
			level: course.level,
			status: course.status,
			createdAt: course.createdAt,
			updatedAt: course.updatedAt,
		};
	}
}
