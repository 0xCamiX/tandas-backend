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
		origin: process.env.NEXT_PUBLIC_URL,
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
	res.send("Hello World");
});

export default app;
