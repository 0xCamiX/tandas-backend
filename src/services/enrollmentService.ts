import type { EnrollmentModel } from "../models/enrollmentModel";
import type {
	CreateEnrollmentDto,
	EnrollmentFilters,
	EnrollmentResponse,
	EnrollmentWithRelationsResponse,
} from "../types/enrollment.types";

export class EnrollmentService {
	constructor(private readonly enrollmentModel: EnrollmentModel) {}

	/**
	 * Obtiene todas las inscripciones aplicando filtros opcionales.
	 *
	 * @param {EnrollmentFilters} [filters] - Filtros opcionales para buscar inscripciones
	 * @returns {Promise<EnrollmentResponse[]>} Array de inscripciones que coinciden con los filtros
	 */
	async getAllEnrollments(
		filters?: EnrollmentFilters
	): Promise<EnrollmentResponse[]> {
		return this.enrollmentModel.findAll(filters);
	}

	/**
	 * Obtiene todas las inscripciones de un usuario específico.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @returns {Promise<EnrollmentResponse[]>} Array de inscripciones del usuario
	 */
	async getEnrollmentsByUserId(userId: string): Promise<EnrollmentResponse[]> {
		return this.enrollmentModel.findByUserId(userId);
	}

	/**
	 * Obtiene una inscripción por su ID.
	 *
	 * @param {string} enrollmentId - Identificador único de la inscripción (UUID)
	 * @returns {Promise<EnrollmentResponse>} Inscripción encontrada
	 * @throws {Error} Si la inscripción no existe (código: "ENROLLMENT_NOT_FOUND")
	 */
	async getEnrollmentById(enrollmentId: string): Promise<EnrollmentResponse> {
		const enrollment = await this.enrollmentModel.findById(enrollmentId);

		if (!enrollment) {
			throw new Error("ENROLLMENT_NOT_FOUND");
		}

		return enrollment;
	}

	/**
	 * Obtiene una inscripción por su ID incluyendo sus relaciones.
	 *
	 * @param {string} enrollmentId - Identificador único de la inscripción (UUID)
	 * @returns {Promise<EnrollmentWithRelationsResponse>} Inscripción con relaciones
	 * @throws {Error} Si la inscripción no existe (código: "ENROLLMENT_NOT_FOUND")
	 */
	async getEnrollmentByIdWithRelations(
		enrollmentId: string
	): Promise<EnrollmentWithRelationsResponse> {
		const enrollment =
			await this.enrollmentModel.findByIdWithRelations(enrollmentId);

		if (!enrollment) {
			throw new Error("ENROLLMENT_NOT_FOUND");
		}

		return enrollment;
	}

	/**
	 * Crea una nueva inscripción. Los datos deben estar validados previamente por el middleware de validación.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @param {CreateEnrollmentDto} data - Datos de la inscripción a crear
	 * @returns {Promise<EnrollmentResponse>} Inscripción creada
	 * @throws {Error} Si el usuario ya está inscrito en el curso (código: "ALREADY_ENROLLED")
	 * @throws {Error} Si el curso no existe (código: "COURSE_NOT_FOUND")
	 */
	async createEnrollment(
		userId: string,
		data: CreateEnrollmentDto
	): Promise<EnrollmentResponse> {
		// Verificar si el usuario ya está inscrito
		const isEnrolled = await this.enrollmentModel.isUserEnrolled(
			userId,
			data.courseId
		);

		if (isEnrolled) {
			throw new Error("ALREADY_ENROLLED");
		}

		// TODO: Verificar si el curso existe (esto debería hacerse en el servicio de cursos)
		// Por ahora, si falla la creación por foreign key, se lanzará un error de base de datos

		return this.enrollmentModel.create({
			user: {
				connect: {
					id: userId,
				},
			},
			course: {
				connect: {
					id: data.courseId,
				},
			},
			progress: 0,
		});
	}

	/**
	 * Elimina una inscripción (desinscribirse de un curso).
	 *
	 * @param {string} enrollmentId - Identificador único de la inscripción (UUID)
	 * @returns {Promise<void>} No retorna valor
	 * @throws {Error} Si la inscripción no existe (código: "ENROLLMENT_NOT_FOUND")
	 */
	async deleteEnrollment(enrollmentId: string): Promise<void> {
		const exists = await this.enrollmentModel.exists(enrollmentId);
		if (!exists) {
			throw new Error("ENROLLMENT_NOT_FOUND");
		}

		await this.enrollmentModel.delete(enrollmentId);
	}

	/**
	 * Obtiene una inscripción por userId y courseId.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @param {string} courseId - Identificador único del curso (UUID)
	 * @returns {Promise<EnrollmentResponse | null>} Inscripción o null si no existe
	 */
	async getEnrollmentByUserAndCourse(
		userId: string,
		courseId: string
	): Promise<EnrollmentResponse | null> {
		return this.enrollmentModel.findByUserAndCourse(userId, courseId);
	}

	/**
	 * Verifica si un usuario está inscrito en un curso específico.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @param {string} courseId - Identificador único del curso (UUID)
	 * @returns {Promise<boolean>} true si está inscrito, false en caso contrario
	 */
	async isUserEnrolledInCourse(
		userId: string,
		courseId: string
	): Promise<boolean> {
		return this.enrollmentModel.isUserEnrolled(userId, courseId);
	}
}
