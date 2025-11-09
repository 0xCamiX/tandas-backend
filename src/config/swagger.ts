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
