import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { type Express } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { auth } from "./lib/auth";
import apiRoutes from "./routes";

const app: Express = express();

app.use(express.json());
app.use(morgan("combined"));
app.use(
	cors({
		origin: [
			process.env.NEXT_PUBLIC_URL as string,
			process.env.BETTER_AUTH_URL as string,
		],
		credentials: true,
		exposedHeaders: ["set-auth-token"],
	})
);
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/v1", apiRoutes);

app.use(
	"/api/v1/docs",
	swaggerUi.serve,
	swaggerUi.setup(swaggerSpec, {
		customCss: ".swagger-ui .topbar { display: none }",
		customSiteTitle: "TANDAS API Documentation",
	})
);

app.get("/", (_req, res) => {
	res.send("TANDAS API");
});

// Health check endpoint for Docker/AWS
app.get("/health", (_req, res) => {
	res.status(200).json({
		status: "healthy",
		timestamp: new Date().toISOString(),
		uptime: process.uptime(),
	});
});

export default app;
