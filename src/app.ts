import { toNodeHandler } from "better-auth/node";
import express, { type Express } from "express";
import morgan from "morgan";
import { auth } from "./lib/auth";

const app: Express = express();

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use(morgan("combined"));

app.get("/", (_req, res) => {
	res.send("Hello World");
});

export default app;
