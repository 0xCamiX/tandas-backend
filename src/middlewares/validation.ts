import type { NextFunction, Request, Response } from "express";
import * as v from "valibot";

/**
 * Middleware genérico para validar el body de la petición
 */
export function validateBody<
	T extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
>(schema: T) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const validated = v.parse(schema, req.body);
			req.body = validated;
			next();
		} catch (error) {
			if (error instanceof v.ValiError) {
				const errors = v.flatten(error.issues);
				return res.status(400).json({
					success: false,
					error: {
						code: "VALIDATION_ERROR",
						message: "Error de validación",
						details: errors,
					},
				});
			}

			return res.status(400).json({
				success: false,
				error: {
					code: "VALIDATION_ERROR",
					message: "Error de validación",
				},
			});
		}
	};
}

/**
 * Middleware genérico para validar los parámetros de la petición
 */
export function validateParams<
	T extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
>(schema: T) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const validated = v.parse(schema, req.params);
			req.params = validated as Request["params"];
			next();
		} catch (error) {
			if (error instanceof v.ValiError) {
				const errors = v.flatten(error.issues);
				return res.status(400).json({
					success: false,
					error: {
						code: "VALIDATION_ERROR",
						message: "Error de validación en parámetros",
						details: errors,
					},
				});
			}

			return res.status(400).json({
				success: false,
				error: {
					code: "VALIDATION_ERROR",
					message: "Error de validación en parámetros",
				},
			});
		}
	};
}

/**
 * Middleware genérico para validar query parameters
 */
export function validateQuery<
	T extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
>(schema: T) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const validated = v.parse(schema, req.query);
			req.query = validated as Request["query"];
			next();
		} catch (error) {
			if (error instanceof v.ValiError) {
				const errors = v.flatten(error.issues);
				return res.status(400).json({
					success: false,
					error: {
						code: "VALIDATION_ERROR",
						message: "Error de validación en query parameters",
						details: errors,
					},
				});
			}

			return res.status(400).json({
				success: false,
				error: {
					code: "VALIDATION_ERROR",
					message: "Error de validación en query parameters",
				},
			});
		}
	};
}
