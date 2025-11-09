import express, { type Express } from "express";

const app: Express = express();

app.get("/", (_req, res) => {
	res.send("Hello World");
});

export default app;
