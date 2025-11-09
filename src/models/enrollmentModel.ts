import { prisma } from "../db/prisma";
import type { Enrollment, Prisma } from "../generated/prisma/client";
import type {
	EnrollmentFilters,
	EnrollmentResponse,
	EnrollmentWithRelationsResponse,
} from "../types/enrollment.types";

export class EnrollmentModel {
	/**
	 * Obtiene todas las inscripciones aplicando filtros opcionales.
	 *
	 * @param {EnrollmentFilters} [filters] - Filtros opcionales para buscar inscripciones
	 * @returns {Promise<EnrollmentResponse[]>} Array de inscripciones que coinciden con los filtros
	 */
	async findAll(filters?: EnrollmentFilters): Promise<EnrollmentResponse[]> {
		const where: Prisma.EnrollmentWhereInput = {};

		if (filters?.userId) {
			where.userId = filters.userId;
		}

		if (filters?.courseId) {
			where.courseId = filters.courseId;
		}

		const enrollments = await prisma.enrollment.findMany({
			where,
			orderBy: {
				enrolledAt: "desc",
			},
		});

		return enrollments.map(this.mapToResponse);
	}

	/**
	 * Obtiene todas las inscripciones de un usuario específico.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @returns {Promise<EnrollmentResponse[]>} Array de inscripciones del usuario
	 */
	async findByUserId(userId: string): Promise<EnrollmentResponse[]> {
		const enrollments = await prisma.enrollment.findMany({
			where: { userId },
			orderBy: {
				enrolledAt: "desc",
			},
		});

		return enrollments.map(this.mapToResponse);
	}

	/**
	 * Obtiene una inscripción por su ID.
	 *
	 * @param {string} enrollmentId - Identificador único de la inscripción (UUID)
	 * @returns {Promise<EnrollmentResponse | null>} Inscripción o null si no existe
	 */
	async findById(enrollmentId: string): Promise<EnrollmentResponse | null> {
		const enrollment = await prisma.enrollment.findUnique({
			where: { id: enrollmentId },
		});

		if (!enrollment) {
			return null;
		}

		return this.mapToResponse(enrollment);
	}

	/**
	 * Obtiene una inscripción por su ID incluyendo sus relaciones.
	 *
	 * @param {string} enrollmentId - Identificador único de la inscripción (UUID)
	 * @returns {Promise<EnrollmentWithRelationsResponse | null>} Inscripción con relaciones o null si no existe
	 */
	async findByIdWithRelations(
		enrollmentId: string
	): Promise<EnrollmentWithRelationsResponse | null> {
		const enrollment = await prisma.enrollment.findUnique({
			where: { id: enrollmentId },
			include: {
				course: true,
			},
		});

		if (!enrollment) {
			return null;
		}

		return {
			...this.mapToResponse(enrollment),
			course: enrollment.course,
		};
	}

	/**
	 * Obtiene una inscripción por userId y courseId.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @param {string} courseId - Identificador único del curso (UUID)
	 * @returns {Promise<EnrollmentResponse | null>} Inscripción o null si no existe
	 */
	async findByUserAndCourse(
		userId: string,
		courseId: string
	): Promise<EnrollmentResponse | null> {
		const enrollment = await prisma.enrollment.findUnique({
			where: {
				userId_courseId: {
					userId,
					courseId,
				},
			},
		});

		if (!enrollment) {
			return null;
		}

		return this.mapToResponse(enrollment);
	}

	/**
	 * Crea una nueva inscripción en la base de datos.
	 *
	 * @param {Prisma.EnrollmentCreateInput} data - Datos de la inscripción a crear
	 * @returns {Promise<EnrollmentResponse>} Inscripción creada
	 */
	async create(
		data: Prisma.EnrollmentCreateInput
	): Promise<EnrollmentResponse> {
		const enrollment = await prisma.enrollment.create({
			data,
		});

		return this.mapToResponse(enrollment);
	}

	/**
	 * Actualiza una inscripción en la base de datos.
	 *
	 * @param {string} enrollmentId - Identificador único de la inscripción (UUID)
	 * @param {Prisma.EnrollmentUpdateInput} data - Datos a actualizar de la inscripción
	 * @returns {Promise<EnrollmentResponse>} Inscripción actualizada
	 * @throws {Error} Si la inscripción no existe
	 */
	async update(
		enrollmentId: string,
		data: Prisma.EnrollmentUpdateInput
	): Promise<EnrollmentResponse> {
		const enrollment = await prisma.enrollment.update({
			where: { id: enrollmentId },
			data,
		});

		return this.mapToResponse(enrollment);
	}

	/**
	 * Elimina una inscripción de la base de datos.
	 *
	 * @param {string} enrollmentId - Identificador único de la inscripción (UUID)
	 * @returns {Promise<void>} No retorna valor
	 * @throws {Error} Si la inscripción no existe
	 */
	async delete(enrollmentId: string): Promise<void> {
		await prisma.enrollment.delete({
			where: { id: enrollmentId },
		});
	}

	/**
	 * Verifica si una inscripción existe.
	 *
	 * @param {string} enrollmentId - Identificador único de la inscripción (UUID)
	 * @returns {Promise<boolean>} true si existe, false si no
	 */
	async exists(enrollmentId: string): Promise<boolean> {
		const count = await prisma.enrollment.count({
			where: { id: enrollmentId },
		});

		return count > 0;
	}

	/**
	 * Verifica si un usuario ya está inscrito en un curso.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @param {string} courseId - Identificador único del curso (UUID)
	 * @returns {Promise<boolean>} true si está inscrito, false si no
	 */
	async isUserEnrolled(userId: string, courseId: string): Promise<boolean> {
		const count = await prisma.enrollment.count({
			where: {
				userId,
				courseId,
			},
		});

		return count > 0;
	}

	/**
	 * Mapea un modelo de Prisma a un EnrollmentResponse.
	 *
	 * @private
	 * @param {Enrollment} enrollment - Inscripción de Prisma
	 * @returns {EnrollmentResponse} Inscripción mapeada
	 */
	private mapToResponse(enrollment: Enrollment): EnrollmentResponse {
		return {
			id: enrollment.id,
			userId: enrollment.userId,
			courseId: enrollment.courseId,
			enrolledAt: enrollment.enrolledAt,
			progress: enrollment.progress,
			completedAt: enrollment.completedAt,
			createdAt: enrollment.createdAt,
			updatedAt: enrollment.updatedAt,
		};
	}
}
