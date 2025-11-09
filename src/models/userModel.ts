import { prisma } from "../db/prisma";
import type { Prisma, User } from "../generated/prisma/client";
import type {
	UserFilters,
	UserStatsResponse,
	UserWithRelationsResponse,
} from "../types/user.types";

export class UserModel {
	/**
	 * Obtiene un usuario por su ID incluyendo todas sus relaciones educativas.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @returns {Promise<UserWithRelationsResponse | null>} Usuario con relaciones educativas o null si no existe
	 */
	async findByIdWithRelations(
		userId: string
	): Promise<UserWithRelationsResponse | null> {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			include: {
				enrollments: {
					include: {
						course: true,
					},
					orderBy: {
						enrolledAt: "desc",
					},
				},
				moduleCompletions: {
					include: {
						module: {
							include: {
								course: true,
							},
						},
					},
					orderBy: {
						completedAt: "desc",
					},
				},
				quizAttempts: {
					include: {
						quiz: {
							include: {
								module: {
									include: {
										course: true,
									},
								},
							},
						},
					},
					orderBy: {
						attemptedAt: "desc",
					},
				},
			},
		});

		if (!user) {
			return null;
		}

		return user as UserWithRelationsResponse;
	}

	/**
	 * Obtiene un usuario por su ID sin relaciones.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @returns {Promise<User | null>} Usuario o null si no existe
	 */
	async findById(userId: string): Promise<User | null> {
		return prisma.user.findUnique({
			where: { id: userId },
		});
	}

	/**
	 * Busca un usuario por su dirección de correo electrónico.
	 *
	 * @param {string} email - Dirección de correo electrónico del usuario
	 * @returns {Promise<User | null>} Usuario o null si no existe
	 */
	async findByEmail(email: string): Promise<User | null> {
		return prisma.user.findUnique({
			where: { email },
		});
	}

	/**
	 * Actualiza el perfil de un usuario en la base de datos.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @param {Prisma.UserUpdateInput} data - Datos a actualizar del usuario
	 * @returns {Promise<User>} Usuario actualizado
	 * @throws {Error} Si el usuario no existe
	 */
	async updateProfile(
		userId: string,
		data: Prisma.UserUpdateInput
	): Promise<User> {
		return prisma.user.update({
			where: { id: userId },
			data,
		});
	}

	/**
	 * Calcula y retorna las estadísticas del usuario.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @returns {Promise<UserStatsResponse>} Estadísticas del usuario (inscripciones, completaciones, intentos de quiz, promedio de calificaciones)
	 */
	async getUserStats(userId: string): Promise<UserStatsResponse> {
		const [enrollments, completions, attempts, quizScores] = await Promise.all([
			prisma.enrollment.count({
				where: { userId },
			}),
			prisma.moduleCompletion.count({
				where: { userId },
			}),
			prisma.quizAttempt.count({
				where: { userId },
			}),
			prisma.quizAttempt.findMany({
				where: { userId },
				select: { score: true },
			}),
		]);

		const averageQuizScore =
			quizScores.length > 0
				? quizScores.reduce((sum, attempt) => sum + attempt.score, 0) /
					quizScores.length
				: 0;

		return {
			totalEnrollments: enrollments,
			totalCompletions: completions,
			totalQuizAttempts: attempts,
			averageQuizScore: Math.round(averageQuizScore * 100) / 100,
		};
	}

	/**
	 * Obtiene el progreso de un usuario en un curso específico.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @param {string} courseId - Identificador único del curso (UUID)
	 * @returns {Promise<{courseId: string, courseTitle: string, progress: number, completedModules: number, totalModules: number, completedAt: Date | null} | null>} Progreso del usuario en el curso o null si no está inscrito
	 */
	async getUserProgressByCourse(userId: string, courseId: string) {
		const enrollment = await prisma.enrollment.findUnique({
			where: {
				userId_courseId: {
					userId,
					courseId,
				},
			},
			include: {
				course: {
					include: {
						modules: {
							orderBy: {
								order: "asc",
							},
						},
					},
				},
			},
		});

		if (!enrollment) {
			return null;
		}

		const totalModules = enrollment.course.modules.length;
		const completedModules = await prisma.moduleCompletion.count({
			where: {
				userId,
				module: {
					courseId,
				},
			},
		});

		return {
			courseId: enrollment.courseId,
			courseTitle: enrollment.course.title,
			progress: enrollment.progress,
			completedModules,
			totalModules,
			completedAt: enrollment.completedAt,
		};
	}

	/**
	 * Obtiene el progreso del usuario en todos los cursos en los que está inscrito.
	 *
	 * @param {string} userId - Identificador único del usuario (UUID)
	 * @returns {Promise<UserProgressResponse[]>} Array con el progreso del usuario en cada curso
	 */
	async getUserProgress(userId: string) {
		const enrollments = await prisma.enrollment.findMany({
			where: { userId },
			include: {
				course: {
					include: {
						modules: {
							orderBy: {
								order: "asc",
							},
						},
					},
				},
			},
		});

		const progressPromises = enrollments.map(async (enrollment) => {
			const completedModules = await prisma.moduleCompletion.count({
				where: {
					userId,
					module: {
						courseId: enrollment.courseId,
					},
				},
			});

			return {
				courseId: enrollment.courseId,
				courseTitle: enrollment.course.title,
				progress: enrollment.progress,
				completedModules,
				totalModules: enrollment.course.modules.length,
				completedAt: enrollment.completedAt,
			};
		});

		return Promise.all(progressPromises);
	}

	/**
	 * Busca usuarios aplicando filtros opcionales. Útil para administradores.
	 *
	 * @param {UserFilters} [filters] - Filtros opcionales para buscar usuarios (email, name)
	 * @returns {Promise<User[]>} Array de usuarios que coinciden con los filtros, ordenados por fecha de creación descendente
	 */
	async findMany(filters?: UserFilters): Promise<User[]> {
		return prisma.user.findMany({
			where: {
				...(filters?.email && {
					email: {
						contains: filters.email,
						mode: "insensitive",
					},
				}),
				...(filters?.name && {
					name: {
						contains: filters.name,
						mode: "insensitive",
					},
				}),
			},
			orderBy: {
				createdAt: "desc",
			},
		});
	}
}
