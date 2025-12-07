import * as v from "valibot";

/**
 * Schema para actualizar perfil de usuario
 */
export const updateUserProfileSchema = v.object({
	name: v.optional(
		v.pipe(
			v.string("El nombre debe ser un texto"),
			v.minLength(1, "El nombre no puede estar vacío"),
			v.maxLength(100, "El nombre no puede exceder 100 caracteres"),
			v.trim()
		)
	),
	image: v.optional(
		v.pipe(
			v.string("La URL de imagen debe ser un texto"),
			v.url("La URL de imagen debe ser válida"),
			v.maxLength(500, "La URL de imagen no puede exceder 500 caracteres")
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
 * Tipo inferido del schema de actualización de perfil
 */
export type UpdateUserProfileInput = v.InferInput<
	typeof updateUserProfileSchema
>;

/**
 * Tipo inferido del schema de courseId param
 */
export type CourseIdParam = v.InferInput<typeof courseIdParamSchema>;
