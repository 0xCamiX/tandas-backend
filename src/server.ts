import app from "./app";

const PORT = process.env.PORT || 3000;

async function startServer() {
	try {
		await new Promise<void>((resolve, reject) => {
			const server = app.listen(PORT, () => {
				console.log(`Server running on port http://localhost:${PORT}`);
				resolve();
			});

			server.on("error", reject);
		});
	} catch (error) {
		console.error("Failed to start server:", error);
		process.exit(1);
	}
}

startServer();
