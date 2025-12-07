import * as v from "valibot";
import { CourseLevel, CourseStatus } from "../generated/prisma/client";

/**
 * Schema para crear un curso
 */
export const createCourseSchema = v.object({
	title: v.pipe(
		v.string("El título debe ser un texto"),
		v.minLength(1, "El título es requerido"),
		v.maxLength(200, "El título no puede exceder 200 caracteres"),
		v.trim()
	),
	description: v.optional(
		v.pipe(
			v.string("La descripción debe ser un texto"),
			v.maxLength(2000, "La descripción no puede exceder 2000 caracteres"),
			v.trim()
		)
	),
	imageUrl: v.optional(
		v.pipe(
			v.string("La URL de imagen debe ser un texto"),
			v.url("La URL de imagen debe ser válida"),
			v.maxLength(500, "La URL de imagen no puede exceder 500 caracteres")
		)
	),
	category: v.pipe(
		v.string("La categoría debe ser un texto"),
		v.minLength(1, "La categoría es requerida"),
		v.maxLength(100, "La categoría no puede exceder 100 caracteres"),
		v.trim()
	),
	level: v.picklist(
		[CourseLevel.BEGINNER, CourseLevel.INTERMEDIATE, CourseLevel.ADVANCED],
		"El nivel debe ser BEGINNER, INTERMEDIATE o ADVANCED"
	),
	status: v.optional(
		v.picklist(
			[CourseStatus.ACTIVE, CourseStatus.INACTIVE],
			"El estado debe ser ACTIVE o INACTIVE"
		)
	),
});

/**
 * Schema para actualizar un curso
 */
export const updateCourseSchema = v.object({
	title: v.optional(
		v.pipe(
			v.string("El título debe ser un texto"),
			v.minLength(1, "El título no puede estar vacío"),
			v.maxLength(200, "El título no puede exceder 200 caracteres"),
			v.trim()
		)
	),
	description: v.optional(
		v.pipe(
			v.string("La descripción debe ser un texto"),
			v.maxLength(2000, "La descripción no puede exceder 2000 caracteres"),
			v.trim()
		)
	),
	imageUrl: v.optional(
		v.pipe(
			v.string("La URL de imagen debe ser un texto"),
			v.url("La URL de imagen debe ser válida"),
			v.maxLength(500, "La URL de imagen no puede exceder 500 caracteres")
		)
	),
	category: v.optional(
		v.pipe(
			v.string("La categoría debe ser un texto"),
			v.minLength(1, "La categoría no puede estar vacía"),
			v.maxLength(100, "La categoría no puede exceder 100 caracteres"),
			v.trim()
		)
	),
	level: v.optional(
		v.picklist(
			[CourseLevel.BEGINNER, CourseLevel.INTERMEDIATE, CourseLevel.ADVANCED],
			"El nivel debe ser BEGINNER, INTERMEDIATE o ADVANCED"
		)
	),
	status: v.optional(
		v.picklist(
			[CourseStatus.ACTIVE, CourseStatus.INACTIVE],
			"El estado debe ser ACTIVE o INACTIVE"
		)
	),
});

/**
 * Schema para validar courseId en params
 */
export const courseIdParamSchema = v.object({
	courseId: v.pipe(
		v.string("El ID del curso debe ser un texto"),
		v.minLength(1, "El ID del curso es requerido"),
		v.uuid("El ID del curso debe ser un UUID válido")
	),
});

/**
 * Schema para validar id en params (para cursos)
 */
export const courseIdParamSchemaAlt = v.object({
	id: v.pipe(
		v.string("El ID del curso debe ser un texto"),
		v.minLength(1, "El ID del curso es requerido"),
		v.uuid("El ID del curso debe ser un UUID válido")
	),
});

/**
 * Schema para query parameters de filtros de cursos
 */
export const courseFiltersSchema = v.object({
	status: v.optional(
		v.picklist(
			[CourseStatus.ACTIVE, CourseStatus.INACTIVE],
			"El estado debe ser ACTIVE o INACTIVE"
		)
	),
	category: v.optional(
		v.pipe(
			v.string("La categoría debe ser un texto"),
			v.maxLength(100, "La categoría no puede exceder 100 caracteres"),
			v.trim()
		)
	),
	level: v.optional(
		v.picklist(
			[CourseLevel.BEGINNER, CourseLevel.INTERMEDIATE, CourseLevel.ADVANCED],
			"El nivel debe ser BEGINNER, INTERMEDIATE o ADVANCED"
		)
	),
	search: v.optional(
		v.pipe(
			v.string("La búsqueda debe ser un texto"),
			v.maxLength(200, "La búsqueda no puede exceder 200 caracteres"),
			v.trim()
		)
	),
});

/**
 * Tipos inferidos de los schemas
 */
export type CreateCourseInput = v.InferInput<typeof createCourseSchema>;
export type UpdateCourseInput = v.InferInput<typeof updateCourseSchema>;
export type CourseIdParam = v.InferInput<typeof courseIdParamSchema>;
export type CourseFiltersInput = v.InferInput<typeof courseFiltersSchema>;
