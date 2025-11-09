import app from "./app";

const PORT = process.env.PORT || 3000;

async function startServer() {
	try {
		app.listen(PORT, () => {
			console.log(`Server running on port http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error("Failed to start server:", error);
		process.exit(1);
	}
}

startServer();
