// Extender el tipo Request de Express para incluir userId
declare global {
	namespace Express {
		interface Request {
			userId?: string;
		}
	}
}

export {};
