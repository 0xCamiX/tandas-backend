import * as v from "valibot";

/**
 * Schema para crear una completación de módulo
 */
export const createModuleCompletionSchema = v.object({
	moduleId: v.pipe(
		v.string("El ID del módulo debe ser un texto"),
		v.minLength(1, "El ID del módulo es requerido"),
		v.uuid("El ID del módulo debe ser un UUID válido")
	),
});

/**
 * Schema para validar moduleCompletionId en params
 */
export const moduleCompletionIdParamSchema = v.object({
	id: v.pipe(
		v.string("El ID de la completación debe ser un texto"),
		v.minLength(1, "El ID de la completación es requerido"),
		v.uuid("El ID de la completación debe ser un UUID válido")
	),
});

/**
 * Schema para validar moduleId en params (para completaciones)
 */
export const moduleCompletionModuleIdParamSchema = v.object({
	moduleId: v.pipe(
		v.string("El ID del módulo debe ser un texto"),
		v.minLength(1, "El ID del módulo es requerido"),
		v.uuid("El ID del módulo debe ser un UUID válido")
	),
});

/**
 * Schema para query parameters de filtros de completaciones
 */
export const moduleCompletionFiltersSchema = v.object({
	userId: v.optional(
		v.pipe(
			v.string("El ID del usuario debe ser un texto"),
			v.uuid("El ID del usuario debe ser un UUID válido")
		)
	),
	moduleId: v.optional(
		v.pipe(
			v.string("El ID del módulo debe ser un texto"),
			v.uuid("El ID del módulo debe ser un UUID válido")
		)
	),
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
export type CreateModuleCompletionInput = v.InferInput<
	typeof createModuleCompletionSchema
>;
export type ModuleCompletionIdParam = v.InferInput<
	typeof moduleCompletionIdParamSchema
>;
export type ModuleCompletionFiltersInput = v.InferInput<
	typeof moduleCompletionFiltersSchema
>;
