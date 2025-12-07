// DTOs para requests
export interface CreateEnrollmentDto {
	courseId: string;
}

// DTOs para responses
export interface EnrollmentResponse {
	id: string;
	userId: string;
	courseId: string;
	enrolledAt: Date;
	progress: number;
	completedAt: Date | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface EnrollmentWithRelationsResponse extends EnrollmentResponse {
	course: {
		id: string;
		title: string;
		description: string | null;
		imageUrl: string | null;
		category: string;
		level: string;
		status: string;
	};
}

// Tipos para filtros
export interface EnrollmentFilters {
	userId?: string;
	courseId?: string;
}
