import * as v from "valibot";
import { QuizType } from "../generated/prisma/client";

/**
 * Schema para crear una opción de quiz
 */
export const createQuizOptionSchema = v.object({
	optionText: v.pipe(
		v.string("El texto de la opción debe ser un texto"),
		v.minLength(1, "El texto de la opción es requerido"),
		v.maxLength(500, "El texto de la opción no puede exceder 500 caracteres"),
		v.trim()
	),
	isCorrect: v.boolean("isCorrect debe ser un booleano"),
	order: v.optional(
		v.pipe(
			v.number("El orden debe ser un número"),
			v.integer("El orden debe ser un número entero"),
			v.minValue(0, "El orden debe ser mayor o igual a 0")
		)
	),
});

/**
 * Schema para crear un quiz
 */
export const createQuizSchema = v.object({
	moduleId: v.pipe(
		v.string("El ID del módulo debe ser un texto"),
		v.minLength(1, "El ID del módulo es requerido"),
		v.uuid("El ID del módulo debe ser un UUID válido")
	),
	question: v.pipe(
		v.string("La pregunta debe ser un texto"),
		v.minLength(1, "La pregunta es requerida"),
		v.maxLength(1000, "La pregunta no puede exceder 1000 caracteres"),
		v.trim()
	),
	type: v.optional(
		v.picklist([QuizType.MULTIPLE_CHOICE], "El tipo debe ser MULTIPLE_CHOICE")
	),
	explanation: v.optional(
		v.pipe(
			v.string("La explicación debe ser un texto"),
			v.maxLength(2000, "La explicación no puede exceder 2000 caracteres"),
			v.trim()
		)
	),
	options: v.pipe(
		v.array(createQuizOptionSchema, "Las opciones deben ser un array"),
		v.minLength(2, "Debe haber al menos 2 opciones"),
		v.maxLength(10, "No puede haber más de 10 opciones")
	),
});

/**
 * Schema para actualizar un quiz
 */
export const updateQuizSchema = v.object({
	question: v.optional(
		v.pipe(
			v.string("La pregunta debe ser un texto"),
			v.minLength(1, "La pregunta no puede estar vacía"),
			v.maxLength(1000, "La pregunta no puede exceder 1000 caracteres"),
			v.trim()
		)
	),
	type: v.optional(
		v.picklist([QuizType.MULTIPLE_CHOICE], "El tipo debe ser MULTIPLE_CHOICE")
	),
	explanation: v.optional(
		v.pipe(
			v.string("La explicación debe ser un texto"),
			v.maxLength(2000, "La explicación no puede exceder 2000 caracteres"),
			v.trim()
		)
	),
});

/**
 * Schema para realizar un intento de quiz
 */
export const createQuizAttemptSchema = v.object({
	quizId: v.pipe(
		v.string("El ID del quiz debe ser un texto"),
		v.minLength(1, "El ID del quiz es requerido"),
		v.uuid("El ID del quiz debe ser un UUID válido")
	),
	responses: v.pipe(
		v.array(
			v.object({
				quizOptionId: v.pipe(
					v.string("El ID de la opción debe ser un texto"),
					v.minLength(1, "El ID de la opción es requerido"),
					v.uuid("El ID de la opción debe ser un UUID válido")
				),
			}),
			"Las respuestas deben ser un array"
		),
		v.minLength(1, "Debe haber al menos una respuesta")
	),
});

/**
 * Schema para validar quizId en params
 */
export const quizIdParamSchema = v.object({
	quizId: v.pipe(
		v.string("El ID del quiz debe ser un texto"),
		v.minLength(1, "El ID del quiz es requerido"),
		v.uuid("El ID del quiz debe ser un UUID válido")
	),
});

/**
 * Schema para validar id en params (para quizzes)
 */
export const quizIdParamSchemaAlt = v.object({
	id: v.pipe(
		v.string("El ID del quiz debe ser un texto"),
		v.minLength(1, "El ID del quiz es requerido"),
		v.uuid("El ID del quiz debe ser un UUID válido")
	),
});

/**
 * Schema para validar moduleId en params
 */
export const moduleIdParamSchema = v.object({
	moduleId: v.pipe(
		v.string("El ID del módulo debe ser un texto"),
		v.minLength(1, "El ID del módulo es requerido"),
		v.uuid("El ID del módulo debe ser un UUID válido")
	),
});

/**
 * Schema para query parameters de filtros de quizzes
 */
export const quizFiltersSchema = v.object({
	moduleId: v.optional(
		v.pipe(
			v.string("El ID del módulo debe ser un texto"),
			v.uuid("El ID del módulo debe ser un UUID válido")
		)
	),
});

/**
 * Tipos inferidos de los schemas
 */
export type CreateQuizInput = v.InferInput<typeof createQuizSchema>;
export type UpdateQuizInput = v.InferInput<typeof updateQuizSchema>;
export type CreateQuizAttemptInput = v.InferInput<
	typeof createQuizAttemptSchema
>;
export type QuizIdParam = v.InferInput<typeof quizIdParamSchema>;
export type QuizFiltersInput = v.InferInput<typeof quizFiltersSchema>;
