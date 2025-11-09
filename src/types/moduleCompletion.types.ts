// DTOs para requests
export interface CreateModuleCompletionDto {
	moduleId: string;
}

// DTOs para responses
export interface ModuleCompletionResponse {
	id: string;
	userId: string;
	moduleId: string;
	completedAt: Date;
	createdAt: Date;
	updatedAt: Date;
}

export interface ModuleCompletionWithDetailsResponse
	extends ModuleCompletionResponse {
	module: {
		id: string;
		title: string;
		courseId: string;
	};
}

// Tipos para filtros
export interface ModuleCompletionFilters {
	userId?: string;
	moduleId?: string;
	courseId?: string;
}
