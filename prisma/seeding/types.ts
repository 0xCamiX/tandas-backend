import type {
	CourseLevel,
	CourseStatus,
	ResourceType,
} from "../../src/generated/prisma/client";

export interface SeedResource {
	type: ResourceType;
	url: string;
	title?: string;
	description?: string;
}

export interface SeedQuizOption {
	text: string;
	isCorrect: boolean;
	order?: number;
}

export interface SeedQuiz {
	question: string;
	explanation?: string;
	options: SeedQuizOption[];
}

export interface SeedModule {
	title: string;
	order: number;
	content?: string;
	videoUrl?: string;
	duration?: number;
	resources?: SeedResource[];
	quiz?: SeedQuiz;
	quizzes?: SeedQuiz[];
}

export interface SeedCourse {
	title: string;
	description?: string;
	imageUrl?: string;
	category: string;
	level: CourseLevel;
	status?: CourseStatus;
	modules: SeedModule[];
}
