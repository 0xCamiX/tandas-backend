import type {
	Enrollment,
	ModuleCompletion,
	QuizAttempt,
} from "../generated/prisma/client";

// DTOs para requests
export interface UpdateUserProfileDto {
	name?: string;
	image?: string;
}

// DTOs para responses
export interface UserProfileResponse {
	id: string;
	email: string;
	name: string | null;
	image: string | null;
	emailVerified: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface UserWithRelationsResponse extends UserProfileResponse {
	enrollments: Enrollment[];
	moduleCompletions: ModuleCompletion[];
	quizAttempts: QuizAttempt[];
}

export interface UserStatsResponse {
	totalEnrollments: number;
	totalCompletions: number;
	totalQuizAttempts: number;
	averageQuizScore: number;
}

export interface UserProgressResponse {
	courseId: string;
	courseTitle: string;
	progress: number;
	completedModules: number;
	totalModules: number;
	completedAt: Date | null;
}

// Tipos para filtros
export interface UserFilters {
	email?: string;
	name?: string;
}
