import type { SwaggerDefinition } from "swagger-jsdoc";
import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition: SwaggerDefinition = {
	openapi: "3.0.0",
	info: {
		title: "TANDAS API",
		version: "1.0.0",
		description:
			"API para la plataforma educativa TANDAS - Cursos de tratamiento de agua",
		contact: {
			name: "TANDAS Team",
		},
	},
	servers: [
		{
			url: "http://localhost:3000",
			description: "Servidor de desarrollo",
		},
	],
	components: {
		securitySchemes: {
			bearerAuth: {
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
				description: "Token de autenticación JWT",
			},
		},
		schemas: {
			Error: {
				type: "object",
				properties: {
					success: {
						type: "boolean",
						example: false,
					},
					error: {
						type: "object",
						properties: {
							code: {
								type: "string",
								example: "USER_NOT_FOUND",
							},
							message: {
								type: "string",
								example: "Usuario no encontrado",
							},
						},
					},
				},
			},
			UserProfile: {
				type: "object",
				properties: {
					id: {
						type: "string",
						format: "uuid",
						example: "123e4567-e89b-12d3-a456-426614174000",
					},
					email: {
						type: "string",
						format: "email",
						example: "usuario@example.com",
					},
					name: {
						type: "string",
						nullable: true,
						example: "Juan Pérez",
					},
					image: {
						type: "string",
						format: "uri",
						nullable: true,
						example: "https://example.com/avatar.jpg",
					},
					emailVerified: {
						type: "boolean",
						example: true,
					},
					createdAt: {
						type: "string",
						format: "date-time",
					},
					updatedAt: {
						type: "string",
						format: "date-time",
					},
				},
			},
			UserStats: {
				type: "object",
				properties: {
					totalEnrollments: {
						type: "integer",
						example: 5,
					},
					totalCompletions: {
						type: "integer",
						example: 12,
					},
					totalQuizAttempts: {
						type: "integer",
						example: 20,
					},
					averageQuizScore: {
						type: "number",
						format: "float",
						example: 85.5,
					},
				},
			},
			UserProgress: {
				type: "object",
				properties: {
					courseId: {
						type: "string",
						format: "uuid",
					},
					courseTitle: {
						type: "string",
						example: "Sedimentación",
					},
					progress: {
						type: "number",
						format: "float",
						minimum: 0,
						maximum: 100,
						example: 75.5,
					},
					completedModules: {
						type: "integer",
						example: 3,
					},
					totalModules: {
						type: "integer",
						example: 4,
					},
					completedAt: {
						type: "string",
						format: "date-time",
						nullable: true,
					},
				},
			},
			UpdateUserProfile: {
				type: "object",
				properties: {
					name: {
						type: "string",
						minLength: 1,
						maxLength: 100,
						example: "Juan Pérez",
					},
					image: {
						type: "string",
						format: "uri",
						maxLength: 500,
						example: "https://example.com/avatar.jpg",
					},
				},
			},
			SignUpRequest: {
				type: "object",
				required: ["name", "email", "password"],
				properties: {
					name: {
						type: "string",
						minLength: 1,
						maxLength: 100,
						example: "John Doe",
						description: "Nombre completo del usuario",
					},
					email: {
						type: "string",
						format: "email",
						example: "john.doe@example.com",
						description: "Dirección de correo electrónico",
					},
					password: {
						type: "string",
						minLength: 8,
						example: "password1234",
						description: "Contraseña del usuario (mínimo 8 caracteres)",
					},
					image: {
						type: "string",
						format: "uri",
						example: "https://example.com/image.png",
						description: "URL de la imagen de perfil del usuario",
					},
					callbackURL: {
						type: "string",
						format: "uri",
						example: "https://example.com/callback",
						description: "URL de redirección después del registro",
					},
				},
			},
			SignInRequest: {
				type: "object",
				required: ["email", "password"],
				properties: {
					email: {
						type: "string",
						format: "email",
						example: "john.doe@example.com",
						description: "Dirección de correo electrónico",
					},
					password: {
						type: "string",
						example: "password1234",
						description: "Contraseña del usuario",
					},
					callbackURL: {
						type: "string",
						format: "uri",
						example: "https://example.com/callback",
						description: "URL de redirección después del inicio de sesión",
					},
				},
			},
			Course: {
				type: "object",
				properties: {
					id: {
						type: "string",
						format: "uuid",
						example: "123e4567-e89b-12d3-a456-426614174000",
					},
					title: {
						type: "string",
						example: "Sedimentación",
					},
					description: {
						type: "string",
						nullable: true,
						example: "Aprende técnicas de sedimentación de agua",
					},
					imageUrl: {
						type: "string",
						format: "uri",
						nullable: true,
						example: "https://example.com/course-image.jpg",
					},
					category: {
						type: "string",
						example: "sedimentación",
					},
					level: {
						type: "string",
						enum: ["BEGINNER", "INTERMEDIATE", "ADVANCED"],
						example: "BEGINNER",
					},
					status: {
						type: "string",
						enum: ["ACTIVE", "INACTIVE"],
						example: "ACTIVE",
					},
					createdAt: {
						type: "string",
						format: "date-time",
					},
					updatedAt: {
						type: "string",
						format: "date-time",
					},
				},
			},
			CourseWithModules: {
				allOf: [
					{
						$ref: "#/components/schemas/Course",
					},
					{
						type: "object",
						properties: {
							modules: {
								type: "array",
								items: {
									type: "object",
									properties: {
										id: {
											type: "string",
											format: "uuid",
										},
										title: {
											type: "string",
											example: "Introducción a la sedimentación",
										},
										order: {
											type: "integer",
											example: 1,
										},
										duration: {
											type: "integer",
											nullable: true,
											example: 30,
											description: "Duración en minutos",
										},
									},
								},
							},
						},
					},
				],
			},
			CreateCourse: {
				type: "object",
				required: ["title", "category", "level"],
				properties: {
					title: {
						type: "string",
						minLength: 1,
						maxLength: 200,
						example: "Sedimentación",
						description: "Título del curso",
					},
					description: {
						type: "string",
						maxLength: 2000,
						example: "Aprende técnicas de sedimentación de agua",
						description: "Descripción del curso",
					},
					imageUrl: {
						type: "string",
						format: "uri",
						maxLength: 500,
						example: "https://example.com/course-image.jpg",
						description: "URL de la imagen del curso",
					},
					category: {
						type: "string",
						minLength: 1,
						maxLength: 100,
						example: "sedimentación",
						description: "Categoría del curso",
					},
					level: {
						type: "string",
						enum: ["BEGINNER", "INTERMEDIATE", "ADVANCED"],
						example: "BEGINNER",
						description: "Nivel del curso",
					},
					status: {
						type: "string",
						enum: ["ACTIVE", "INACTIVE"],
						example: "ACTIVE",
						description: "Estado del curso",
					},
				},
			},
			UpdateCourse: {
				type: "object",
				properties: {
					title: {
						type: "string",
						minLength: 1,
						maxLength: 200,
						example: "Sedimentación Avanzada",
						description: "Título del curso",
					},
					description: {
						type: "string",
						maxLength: 2000,
						example: "Aprende técnicas avanzadas de sedimentación de agua",
						description: "Descripción del curso",
					},
					imageUrl: {
						type: "string",
						format: "uri",
						maxLength: 500,
						example: "https://example.com/course-image.jpg",
						description: "URL de la imagen del curso",
					},
					category: {
						type: "string",
						minLength: 1,
						maxLength: 100,
						example: "sedimentación",
						description: "Categoría del curso",
					},
					level: {
						type: "string",
						enum: ["BEGINNER", "INTERMEDIATE", "ADVANCED"],
						example: "INTERMEDIATE",
						description: "Nivel del curso",
					},
					status: {
						type: "string",
						enum: ["ACTIVE", "INACTIVE"],
						example: "ACTIVE",
						description: "Estado del curso",
					},
				},
			},
			Module: {
				type: "object",
				properties: {
					id: {
						type: "string",
						format: "uuid",
						example: "123e4567-e89b-12d3-a456-426614174000",
					},
					courseId: {
						type: "string",
						format: "uuid",
						example: "123e4567-e89b-12d3-a456-426614174000",
					},
					title: {
						type: "string",
						example: "Introducción a la sedimentación",
					},
					content: {
						type: "string",
						nullable: true,
						example: "Contenido educativo del módulo",
					},
					videoUrl: {
						type: "string",
						format: "uri",
						nullable: true,
						example: "https://example.com/video.mp4",
					},
					order: {
						type: "integer",
						example: 1,
					},
					duration: {
						type: "integer",
						nullable: true,
						example: 30,
						description: "Duración en minutos",
					},
					createdAt: {
						type: "string",
						format: "date-time",
					},
					updatedAt: {
						type: "string",
						format: "date-time",
					},
				},
			},
			ModuleWithRelations: {
				allOf: [
					{
						$ref: "#/components/schemas/Module",
					},
					{
						type: "object",
						properties: {
							course: {
								type: "object",
								properties: {
									id: {
										type: "string",
										format: "uuid",
									},
									title: {
										type: "string",
										example: "Sedimentación",
									},
								},
							},
							quizzes: {
								type: "array",
								items: {
									type: "object",
									properties: {
										id: {
											type: "string",
											format: "uuid",
										},
										question: {
											type: "string",
											example: "¿Qué es la sedimentación?",
										},
									},
								},
							},
							resources: {
								type: "array",
								items: {
									type: "object",
									properties: {
										id: {
											type: "string",
											format: "uuid",
										},
										resourceType: {
											type: "string",
											enum: ["PDF", "DOC", "PPT", "VIDEO", "LINK", "OTHER"],
										},
										url: {
											type: "string",
											format: "uri",
										},
										title: {
											type: "string",
											nullable: true,
										},
									},
								},
							},
						},
					},
				],
			},
			CreateModule: {
				type: "object",
				required: ["courseId", "title"],
				properties: {
					courseId: {
						type: "string",
						format: "uuid",
						example: "123e4567-e89b-12d3-a456-426614174000",
						description: "ID del curso al que pertenece el módulo",
					},
					title: {
						type: "string",
						minLength: 1,
						maxLength: 200,
						example: "Introducción a la sedimentación",
						description: "Título del módulo",
					},
					content: {
						type: "string",
						maxLength: 10000,
						example: "Contenido educativo del módulo",
						description: "Contenido de texto del módulo",
					},
					videoUrl: {
						type: "string",
						format: "uri",
						maxLength: 500,
						example: "https://example.com/video.mp4",
						description: "URL del video del módulo",
					},
					order: {
						type: "integer",
						minimum: 0,
						example: 1,
						description: "Orden del módulo en el curso",
					},
					duration: {
						type: "integer",
						minimum: 0,
						example: 30,
						description: "Duración del módulo en minutos",
					},
				},
			},
			UpdateModule: {
				type: "object",
				properties: {
					title: {
						type: "string",
						minLength: 1,
						maxLength: 200,
						example: "Introducción avanzada a la sedimentación",
						description: "Título del módulo",
					},
					content: {
						type: "string",
						maxLength: 10000,
						example: "Contenido educativo actualizado del módulo",
						description: "Contenido de texto del módulo",
					},
					videoUrl: {
						type: "string",
						format: "uri",
						maxLength: 500,
						example: "https://example.com/video.mp4",
						description: "URL del video del módulo",
					},
					order: {
						type: "integer",
						minimum: 0,
						example: 2,
						description: "Orden del módulo en el curso",
					},
					duration: {
						type: "integer",
						minimum: 0,
						example: 45,
						description: "Duración del módulo en minutos",
					},
				},
			},
		},
	},
	security: [
		{
			bearerAuth: [],
		},
	],
};

const options = {
	definition: swaggerDefinition,
	apis: ["./src/routes/**/*.ts", "./dist/routes/**/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
