import type { NextFunction, Request, Response } from "express";
import type { BaseIssue, BaseSchema } from "valibot";
import { parse, ValiError } from "valibot";

/**
 * Middleware genérico para validar el body de la petición
 */
export function validateBody<
	T extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
>(schema: T) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			req.body = parse(schema, req.body);
			next();
		} catch (error) {
			if (error instanceof ValiError) {
				return res.status(400).json({ errors: error.issues });
			}
			next(error);
		}
	};
}

/**
 * Middleware genérico para validar los parámetros de la petición
 */
export function validateParams<
	T extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
>(schema: T) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			// Validar sin asignar (req.params es readonly)
			parse(schema, req.params);
			next();
		} catch (error) {
			if (error instanceof ValiError) {
				return res.status(400).json({ errors: error.issues });
			}
			next(error);
		}
	};
}

/**
 * Middleware genérico para validar query parameters
 */
export function validateQuery<
	T extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
>(schema: T) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			// Validar sin asignar (req.query es readonly)
			parse(schema, req.query);
			next();
		} catch (error) {
			if (error instanceof ValiError) {
				return res.status(400).json({ errors: error.issues });
			}
			next(error);
		}
	};
}
