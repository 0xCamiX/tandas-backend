import * as v from "valibot";

/**
 * Schema para crear una inscripción
 */
export const createEnrollmentSchema = v.object({
	courseId: v.pipe(
		v.string("El ID del curso debe ser un texto"),
		v.minLength(1, "El ID del curso es requerido"),
		v.uuid("El ID del curso debe ser un UUID válido")
	),
});

/**
 * Schema para validar enrollmentId en params
 */
export const enrollmentIdParamSchema = v.object({
	id: v.pipe(
		v.string("El ID de la inscripción debe ser un texto"),
		v.minLength(1, "El ID de la inscripción es requerido"),
		v.uuid("El ID de la inscripción debe ser un UUID válido")
	),
});

/**
 * Schema para validar courseId en params (para inscripciones)
 */
export const enrollmentCourseIdParamSchema = v.object({
	courseId: v.pipe(
		v.string("El ID del curso debe ser un texto"),
		v.minLength(1, "El ID del curso es requerido"),
		v.uuid("El ID del curso debe ser un UUID válido")
	),
});

/**
 * Schema para query parameters de filtros de inscripciones
 */
export const enrollmentFiltersSchema = v.object({
	userId: v.optional(
		v.pipe(
			v.string("El ID del usuario debe ser un texto"),
			v.uuid("El ID del usuario debe ser un UUID válido")
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
export type CreateEnrollmentInput = v.InferInput<typeof createEnrollmentSchema>;
export type EnrollmentIdParam = v.InferInput<typeof enrollmentIdParamSchema>;
export type EnrollmentFiltersInput = v.InferInput<
	typeof enrollmentFiltersSchema
>;
