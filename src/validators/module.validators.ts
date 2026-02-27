import * as v from "valibot";

/**
 * Schema para crear un módulo
 */
export const createModuleSchema = v.object({
	courseId: v.pipe(
		v.string("El ID del curso debe ser un texto"),
		v.minLength(1, "El ID del curso es requerido"),
		v.uuid("El ID del curso debe ser un UUID válido")
	),
	title: v.pipe(
		v.string("El título debe ser un texto"),
		v.minLength(1, "El título es requerido"),
		v.maxLength(200, "El título no puede exceder 200 caracteres"),
		v.trim()
	),
	content: v.optional(
		v.pipe(
			v.string("El contenido debe ser un texto"),
			v.maxLength(10000, "El contenido no puede exceder 10000 caracteres"),
			v.trim()
		)
	),
	videoUrl: v.optional(
		v.pipe(
			v.string("La URL de video debe ser un texto"),
			v.url("La URL de video debe ser válida"),
			v.maxLength(500, "La URL de video no puede exceder 500 caracteres")
		)
	),
	authorNote: v.optional(
		v.pipe(
			v.string("La nota de autor debe ser un texto"),
			v.maxLength(300, "La nota de autor no puede exceder 300 caracteres"),
			v.trim()
		)
	),
	order: v.optional(
		v.pipe(
			v.number("El orden debe ser un número"),
			v.integer("El orden debe ser un número entero"),
			v.minValue(0, "El orden debe ser mayor o igual a 0")
		)
	),
	duration: v.optional(
		v.pipe(
			v.number("La duración debe ser un número"),
			v.integer("La duración debe ser un número entero"),
			v.minValue(0, "La duración debe ser mayor o igual a 0")
		)
	),
});

/**
 * Schema para actualizar un módulo
 */
export const updateModuleSchema = v.object({
	title: v.optional(
		v.pipe(
			v.string("El título debe ser un texto"),
			v.minLength(1, "El título no puede estar vacío"),
			v.maxLength(200, "El título no puede exceder 200 caracteres"),
			v.trim()
		)
	),
	content: v.optional(
		v.pipe(
			v.string("El contenido debe ser un texto"),
			v.maxLength(10000, "El contenido no puede exceder 10000 caracteres"),
			v.trim()
		)
	),
	videoUrl: v.optional(
		v.pipe(
			v.string("La URL de video debe ser un texto"),
			v.url("La URL de video debe ser válida"),
			v.maxLength(500, "La URL de video no puede exceder 500 caracteres")
		)
	),
	authorNote: v.optional(
		v.pipe(
			v.string("La nota de autor debe ser un texto"),
			v.maxLength(300, "La nota de autor no puede exceder 300 caracteres"),
			v.trim()
		)
	),
	order: v.optional(
		v.pipe(
			v.number("El orden debe ser un número"),
			v.integer("El orden debe ser un número entero"),
			v.minValue(0, "El orden debe ser mayor o igual a 0")
		)
	),
	duration: v.optional(
		v.pipe(
			v.number("La duración debe ser un número"),
			v.integer("La duración debe ser un número entero"),
			v.minValue(0, "La duración debe ser mayor o igual a 0")
		)
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
 * Schema para validar id en params (para módulos)
 */
export const moduleIdParamSchemaAlt = v.object({
	id: v.pipe(
		v.string("El ID del módulo debe ser un texto"),
		v.minLength(1, "El ID del módulo es requerido"),
		v.uuid("El ID del módulo debe ser un UUID válido")
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
 * Schema para query parameters de filtros de módulos
 */
export const moduleFiltersSchema = v.object({
	courseId: v.optional(
		v.pipe(
			v.string("El ID del curso debe ser un texto"),
			v.uuid("El ID del curso debe ser un UUID válido")
		)
	),
});

/**
 * Tipos inferidos de los schemas
 */
export type CreateModuleInput = v.InferInput<typeof createModuleSchema>;
export type UpdateModuleInput = v.InferInput<typeof updateModuleSchema>;
export type ModuleIdParam = v.InferInput<typeof moduleIdParamSchema>;
export type ModuleFiltersInput = v.InferInput<typeof moduleFiltersSchema>;
