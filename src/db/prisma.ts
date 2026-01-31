import { PrismaPg } from "@prisma/adapter-pg";
import { withAccelerate } from "@prisma/extension-accelerate";
import pg from "pg";
import { PrismaClient } from "../generated/prisma/client";

const databaseUrl = process.env.DATABASE_URL as string;
const useAccelerate =
	databaseUrl?.startsWith("prisma://") ||
	databaseUrl?.startsWith("prisma+postgres://");

export const prisma = useAccelerate
	? new PrismaClient({
			accelerateUrl: databaseUrl,
		}).$extends(withAccelerate())
	: (() => {
			const pool = new pg.Pool({
				connectionString: databaseUrl,
			});
			const adapter = new PrismaPg(pool);
			return new PrismaClient({ adapter });
		})();
