import { prisma } from "../../src/db/prisma";
import { courseSeedData } from "./data/courses";
import type { SeedCourse, SeedModule } from "./types";

type SeedOptions = {
	dryRun: boolean;
	courseFilter?: string;
};

// Tipo para el cliente de transacción de Prisma
type TransactionClient = Parameters<
	Parameters<typeof prisma.$transaction>[0]
>[0];

const args = Bun.argv.slice(2);

function parseArgs(): SeedOptions {
	const dryRun = args.includes("--dry-run");
	const courseArg = args.find((arg) => arg.startsWith("--course="));

	return {
		dryRun,
		courseFilter: courseArg ? courseArg.split("=")[1] : undefined,
	};
}

async function purgeCourseData(tx: TransactionClient, courseId: string) {
	await tx.quizResponse.deleteMany({
		where: {
			attempt: {
				quiz: {
					module: { courseId },
				},
			},
		},
	});
	await tx.quizAttempt.deleteMany({
		where: {
			quiz: {
				module: { courseId },
			},
		},
	});
	await tx.quizOption.deleteMany({
		where: {
			quiz: {
				module: { courseId },
			},
		},
	});
	await tx.quiz.deleteMany({
		where: {
			module: { courseId },
		},
	});
	await tx.resource.deleteMany({
		where: {
			module: { courseId },
		},
	});
	await tx.moduleCompletion.deleteMany({
		where: {
			module: { courseId },
		},
	});
	await tx.module.deleteMany({
		where: {
			courseId,
		},
	});
}

async function seedModule(
	tx: TransactionClient,
	courseId: string,
	moduleSeed: SeedModule
) {
	const moduleRecord = await tx.module.create({
		data: {
			courseId,
			title: moduleSeed.title,
			content: moduleSeed.content,
			videoUrl: moduleSeed.videoUrl,
			order: moduleSeed.order,
			duration: moduleSeed.duration ?? 0,
		},
	});

	if (moduleSeed.resources?.length) {
		await tx.resource.createMany({
			data: moduleSeed.resources.map((resource) => ({
				moduleId: moduleRecord.id,
				resourceType: resource.type,
				url: resource.url,
				title: resource.title,
				description: resource.description,
			})),
		});
	}

	if (moduleSeed.quiz) {
		const quizRecord = await tx.quiz.create({
			data: {
				moduleId: moduleRecord.id,
				question: moduleSeed.quiz.question,
				explanation: moduleSeed.quiz.explanation,
				type: "MULTIPLE_CHOICE",
			},
		});

		await tx.quizOption.createMany({
			data: moduleSeed.quiz.options.map((option, index) => ({
				quizId: quizRecord.id,
				optionText: option.text,
				isCorrect: option.isCorrect,
				order: option.order ?? index + 1,
			})),
		});
	}
}

async function seedCourse(courseSeed: SeedCourse, dryRun: boolean) {
	if (dryRun) {
		console.info(`[DRY RUN] Seeding course: ${courseSeed.title}`);
		return;
	}

	await prisma.$transaction(
		async (tx) => {
			const existingCourse = await tx.course.findFirst({
				where: { title: courseSeed.title },
				select: { id: true },
			});

			const courseRecord = existingCourse
				? await tx.course.update({
						where: { id: existingCourse.id },
						data: {
							description: courseSeed.description,
							imageUrl: courseSeed.imageUrl,
							category: courseSeed.category,
							level: courseSeed.level,
							status: courseSeed.status ?? "ACTIVO",
						},
					})
				: await tx.course.create({
						data: {
							title: courseSeed.title,
							description: courseSeed.description,
							imageUrl: courseSeed.imageUrl,
							category: courseSeed.category,
							level: courseSeed.level,
							status: courseSeed.status ?? "ACTIVO",
						},
					});

			await purgeCourseData(tx, courseRecord.id);

			const orderedModules = [...courseSeed.modules].sort(
				(a, b) => a.order - b.order
			);

			for (const moduleSeed of orderedModules) {
				await seedModule(tx, courseRecord.id, moduleSeed);
			}
		},
		{
			maxWait: 5000, // 5 segundos para esperar a que la transacción comience
			timeout: 15000, // 15 segundos máximo (límite de Prisma Accelerate)
		}
	);

	console.info(`Course synced: ${courseSeed.title}`);
}

async function main() {
	const options = parseArgs();
	const selectedCourses = options.courseFilter
		? courseSeedData.filter(
				(course) =>
					course.title
						.toLowerCase()
						.includes(options.courseFilter?.toLowerCase() ?? "") ||
					course.category
						.toLowerCase()
						.includes(options.courseFilter?.toLowerCase() ?? "")
			)
		: courseSeedData;

	if (!selectedCourses.length) {
		console.warn("No seed data matched the provided filter.");
		return;
	}

	for (const course of selectedCourses) {
		try {
			await seedCourse(course, options.dryRun);
		} catch (error) {
			console.error(
				`Failed to seed course "${course.title}":`,
				error instanceof Error ? error.message : error
			);
			// Continuar con el siguiente curso aunque este falle
		}
	}
}

main()
	.catch((error) => {
		console.error("Seed process failed:", error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
