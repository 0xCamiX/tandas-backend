import { prisma } from "../../src/db/prisma";

type CleanupScope = "educational" | "all";

const args = new Set(Bun.argv.slice(2));
const scope: CleanupScope = args.has("--all") ? "all" : "educational";

async function cleanupEducationalData() {
	await prisma.quizResponse.deleteMany();
	await prisma.quizAttempt.deleteMany();
	await prisma.quizOption.deleteMany();
	await prisma.quiz.deleteMany();
	await prisma.resource.deleteMany();
	await prisma.moduleCompletion.deleteMany();
	await prisma.module.deleteMany();
	await prisma.enrollment.deleteMany();
	await prisma.course.deleteMany();
}

async function cleanupAuthData() {
	await prisma.session.deleteMany();
	await prisma.account.deleteMany();
	await prisma.verification.deleteMany();
	await prisma.user.deleteMany();
}

async function main() {
	console.info(`Starting cleanup in "${scope}" mode...`);

	await prisma.$transaction(async () => {
		await cleanupEducationalData();

		if (scope === "all") {
			await cleanupAuthData();
		}
	});

	console.info("Database cleanup completed.");
}

main()
	.catch((error) => {
		console.error("Cleanup failed:", error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
