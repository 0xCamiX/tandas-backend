import type { QuizType } from "../generated/prisma/client";

// DTOs para requests
export interface CreateQuizDto {
	moduleId: string;
	question: string;
	type?: QuizType;
	explanation?: string;
	options: Array<{
		optionText: string;
		isCorrect: boolean;
		order?: number;
	}>;
}

export interface UpdateQuizDto {
	question?: string;
	type?: QuizType;
	explanation?: string;
}

export interface CreateQuizAttemptDto {
	quizId: string;
	responses: Array<{
		quizOptionId: string;
	}>;
}

// DTOs para responses
export interface QuizResponse {
	id: string;
	moduleId: string;
	question: string;
	type: QuizType;
	explanation: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface QuizWithOptionsResponse extends QuizResponse {
	options: Array<{
		id: string;
		optionText: string;
		isCorrect: boolean;
		order: number;
	}>;
}

export interface QuizAttemptResponse {
	id: string;
	userId: string;
	quizId: string;
	score: number;
	isCorrect: boolean;
	attemptedAt: Date;
	createdAt: Date;
	updatedAt: Date;
}

export interface QuizAttemptWithDetailsResponse extends QuizAttemptResponse {
	quiz: {
		id: string;
		question: string;
		explanation: string | null;
	};
	responses: Array<{
		id: string;
		quizOptionId: string;
		quizOption: {
			id: string;
			optionText: string;
			isCorrect: boolean;
		};
	}>;
}

// Tipos para filtros
export interface QuizFilters {
	moduleId?: string;
}
