// DTOs para requests
export interface CreateModuleDto {
	courseId: string;
	title: string;
	content?: string;
	videoUrl?: string;
	order?: number;
	duration?: number;
}

export interface UpdateModuleDto {
	title?: string;
	content?: string;
	videoUrl?: string;
	order?: number;
	duration?: number;
}

// DTOs para responses
export interface ModuleResponse {
	id: string;
	courseId: string;
	title: string;
	content: string | null;
	videoUrl: string | null;
	order: number;
	duration: number | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface ModuleWithRelationsResponse extends ModuleResponse {
	course: {
		id: string;
		title: string;
	};
	quizzes: Array<{
		id: string;
		question: string;
	}>;
	resources: Array<{
		id: string;
		resourceType: string;
		url: string;
		title: string | null;
	}>;
}

// Tipos para filtros
export interface ModuleFilters {
	courseId?: string;
}
