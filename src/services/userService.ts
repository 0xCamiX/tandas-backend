import type { Enrollment } from "../generated/prisma/client";
import type { UserModel } from "../models/userModel";
import type {
	UpdateUserProfileDto,
	UserProfileResponse,
	UserProgressResponse,
	UserStatsResponse,
	UserWithRelationsResponse,
} from "../types/user.types";

export class UserService {
	constructor(private readonly userModel: UserModel) {}

	/**
	 * Obtiene el perfil básico del usuario actual.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @returns {Promise<UserProfileResponse>} Perfil del usuario
	 * @throws {Error} Si el usuario no existe (código: "USER_NOT_FOUND")
	 */
	async getCurrentUserProfile(userId: string): Promise<UserProfileResponse> {
		const user = await this.userModel.findById(userId);

		if (!user) {
			throw new Error("USER_NOT_FOUND");
		}

		return {
			id: user.id,
			email: user.email,
			name: user.name,
			image: user.image,
			emailVerified: user.emailVerified,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		};
	}

	/**
	 * Obtiene el perfil completo del usuario incluyendo todas sus relaciones educativas.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @returns {Promise<UserWithRelationsResponse>} Perfil completo con inscripciones, completaciones de módulos e intentos de quiz
	 * @throws {Error} Si el usuario no existe (código: "USER_NOT_FOUND")
	 */
	async getCurrentUserWithRelations(
		userId: string
	): Promise<UserWithRelationsResponse> {
		const user = await this.userModel.findByIdWithRelations(userId);

		if (!user) {
			throw new Error("USER_NOT_FOUND");
		}

		return user;
	}

	/**
	 * Actualiza el perfil del usuario. Los datos deben estar validados previamente por el middleware de validación.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @param {UpdateUserProfileDto} data - Datos a actualizar (name, image)
	 * @returns {Promise<UserProfileResponse>} Perfil del usuario actualizado
	 * @throws {Error} Si el usuario no existe (código: "USER_NOT_FOUND")
	 */
	async updateUserProfile(
		userId: string,
		data: UpdateUserProfileDto
	): Promise<UserProfileResponse> {
		const existingUser = await this.userModel.findById(userId);
		if (!existingUser) {
			throw new Error("USER_NOT_FOUND");
		}

		const updatedUser = await this.userModel.updateProfile(userId, {
			...(data.name !== undefined && { name: data.name }),
			...(data.image !== undefined && { image: data.image }),
			updatedAt: new Date(),
		});

		return {
			id: updatedUser.id,
			email: updatedUser.email,
			name: updatedUser.name,
			image: updatedUser.image,
			emailVerified: updatedUser.emailVerified,
			createdAt: updatedUser.createdAt,
			updatedAt: updatedUser.updatedAt,
		};
	}

	/**
	 * Obtiene las estadísticas del usuario (inscripciones, completaciones, intentos de quiz, promedio de calificaciones).
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @returns {Promise<UserStatsResponse>} Estadísticas del usuario
	 * @throws {Error} Si el usuario no existe (código: "USER_NOT_FOUND")
	 */
	async getUserStats(userId: string): Promise<UserStatsResponse> {
		const user = await this.userModel.findById(userId);
		if (!user) {
			throw new Error("USER_NOT_FOUND");
		}

		return this.userModel.getUserStats(userId);
	}

	/**
	 * Obtiene el progreso del usuario en un curso específico.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @param {string} courseId - Identificador único del curso (UUID)
	 * @returns {Promise<UserProgressResponse>} Progreso del usuario en el curso
	 * @throws {Error} Si el usuario no existe (código: "USER_NOT_FOUND")
	 * @throws {Error} Si el usuario no está inscrito en el curso (código: "ENROLLMENT_NOT_FOUND")
	 */
	async getUserProgressByCourse(
		userId: string,
		courseId: string
	): Promise<UserProgressResponse> {
		const user = await this.userModel.findById(userId);
		if (!user) {
			throw new Error("USER_NOT_FOUND");
		}

		const progress = await this.userModel.getUserProgressByCourse(
			userId,
			courseId
		);

		if (!progress) {
			throw new Error("ENROLLMENT_NOT_FOUND");
		}

		return progress;
	}

	/**
	 * Obtiene el progreso del usuario en todos los cursos en los que está inscrito.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @returns {Promise<UserProgressResponse[]>} Array con el progreso del usuario en cada curso
	 * @throws {Error} Si el usuario no existe (código: "USER_NOT_FOUND")
	 */
	async getUserProgress(userId: string): Promise<UserProgressResponse[]> {
		const user = await this.userModel.findById(userId);
		if (!user) {
			throw new Error("USER_NOT_FOUND");
		}

		return this.userModel.getUserProgress(userId);
	}

	/**
	 * Obtiene todas las inscripciones del usuario con información de los cursos.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @returns {Promise<Enrollment[]>} Array de inscripciones del usuario
	 * @throws {Error} Si el usuario no existe (código: "USER_NOT_FOUND")
	 */
	async getUserEnrollments(userId: string): Promise<Enrollment[]> {
		const user = await this.userModel.findById(userId);
		if (!user) {
			throw new Error("USER_NOT_FOUND");
		}

		const userWithRelations =
			await this.userModel.findByIdWithRelations(userId);
		if (!userWithRelations) {
			throw new Error("USER_NOT_FOUND");
		}

		return userWithRelations.enrollments;
	}
}
