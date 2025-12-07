import type { CourseLevel, CourseStatus } from "../generated/prisma/client";

// DTOs para requests
export interface CreateCourseDto {
	title: string;
	description?: string;
	imageUrl?: string;
	category: string;
	level: CourseLevel;
	status?: CourseStatus;
}

export interface UpdateCourseDto {
	title?: string;
	description?: string;
	imageUrl?: string;
	category?: string;
	level?: CourseLevel;
	status?: CourseStatus;
}

// DTOs para responses
export interface CourseResponse {
	id: string;
	title: string;
	description: string | null;
	imageUrl: string | null;
	category: string;
	level: CourseLevel;
	status: CourseStatus;
	createdAt: Date;
	updatedAt: Date;
}

export interface CourseWithModulesResponse extends CourseResponse {
	modules: Array<{
		id: string;
		title: string;
		order: number;
		duration: number | null;
	}>;
}

// Tipos para filtros
export interface CourseFilters {
	status?: CourseStatus;
	category?: string;
	level?: CourseLevel;
	search?: string;
}
