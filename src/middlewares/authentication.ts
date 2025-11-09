import { fromNodeHeaders } from "better-auth/node";
import type { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";

export async function authenticate(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const session = await auth.api.getSession({
		headers: fromNodeHeaders(req.headers),
	});
	if (!session || !session.user) {
		return res.status(401).json({ error: "Unauthorized" });
	}
	next();
}
