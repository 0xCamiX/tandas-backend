import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { disinfectionCourse } from "./seeding/courses/disinfection";
import { safeStorageCourse } from "./seeding/courses/safeStorage";
import type { SeedCourse, SeedModule } from "./seeding/types";

const prisma = new PrismaClient({
	accelerateUrl: process.env.DATABASE_URL as string,
});

/**
 * Limpia todos los datos relacionados con un curso existente
 */
async function purgeCourseData(courseId: string) {
	await prisma.quizResponse.deleteMany({
		where: {
			attempt: {
				quiz: {
					module: {
						courseId,
					},
				},
			},
		},
	});

	await prisma.quizAttempt.deleteMany({
		where: {
			quiz: {
				module: {
					courseId,
				},
			},
		},
	});

	await prisma.quizOption.deleteMany({
		where: {
			quiz: {
				module: {
					courseId,
				},
			},
		},
	});

	await prisma.quiz.deleteMany({
		where: {
			module: {
				courseId,
			},
		},
	});

	await prisma.resource.deleteMany({
		where: {
			module: {
				courseId,
			},
		},
	});

	await prisma.moduleCompletion.deleteMany({
		where: {
			module: {
				courseId,
			},
		},
	});

	await prisma.module.deleteMany({
		where: {
			courseId,
		},
	});

	await prisma.enrollment.deleteMany({
		where: {
			courseId,
		},
	});
}

/**
 * Sembrar un módulo con sus recursos y quizzes
 */
async function seedModule(courseId: string, moduleSeed: SeedModule) {
	const moduleRecord = await prisma.module.create({
		data: {
			courseId,
			title: moduleSeed.title,
			content: moduleSeed.content,
			videoUrl: moduleSeed.videoUrl,
			order: moduleSeed.order,
			duration: moduleSeed.duration ?? 0,
		},
	});

	// Crear recursos si existen
	if (moduleSeed.resources?.length) {
		await prisma.resource.createMany({
			data: moduleSeed.resources.map((resource) => ({
				moduleId: moduleRecord.id,
				resourceType: resource.type,
				url: resource.url,
				title: resource.title,
				description: resource.description,
			})),
		});
	}

	// Soporte para múltiples quizzes o un solo quiz (compatibilidad)
	const quizzesToCreate =
		moduleSeed.quizzes || (moduleSeed.quiz ? [moduleSeed.quiz] : []);

	for (const quizSeed of quizzesToCreate) {
		if (!quizSeed || !quizSeed.options || !Array.isArray(quizSeed.options)) {
			console.warn(
				`Warning: Quiz in module "${moduleSeed.title}" has invalid structure, skipping.`
			);
			continue;
		}

		const quizRecord = await prisma.quiz.create({
			data: {
				moduleId: moduleRecord.id,
				question: quizSeed.question,
				explanation: quizSeed.explanation,
				type: "MULTIPLE_CHOICE",
			},
		});

		const validOptions = quizSeed.options
			.filter(
				(option) =>
					option &&
					typeof option === "object" &&
					typeof option.text === "string" &&
					typeof option.isCorrect === "boolean"
			)
			.map((option, index) => ({
				quizId: quizRecord.id,
				optionText: String(option.text),
				isCorrect: Boolean(option.isCorrect),
				order: Number(option.order ?? index + 1),
			}));

		if (validOptions.length === 0) {
			console.warn(
				`Warning: Quiz "${quizSeed.question}" has no valid options, skipping.`
			);
			continue;
		}

		// Usar createMany para mejor rendimiento según las mejores prácticas de Prisma
		await prisma.quizOption.createMany({
			data: validOptions,
		});
	}
}

/**
 * Sembrar un curso completo con todos sus módulos
 */
async function seedCourse(courseSeed: SeedCourse) {
	console.info(`Seeding course: ${courseSeed.title}`);

	// Buscar si el curso ya existe
	const existingCourse = await prisma.course.findFirst({
		where: {
			title: courseSeed.title,
		},
	});

	// Crear o actualizar el curso
	const courseRecord = existingCourse
		? await prisma.course.update({
				where: { id: existingCourse.id },
				data: {
					description: courseSeed.description,
					imageUrl: courseSeed.imageUrl,
					category: courseSeed.category,
					level: courseSeed.level,
					status: courseSeed.status ?? "ACTIVO",
				},
			})
		: await prisma.course.create({
				data: {
					title: courseSeed.title,
					description: courseSeed.description,
					imageUrl: courseSeed.imageUrl,
					category: courseSeed.category,
					level: courseSeed.level,
					status: courseSeed.status ?? "ACTIVO",
				},
			});

	// Limpiar datos existentes del curso
	await purgeCourseData(courseRecord.id);

	// Ordenar módulos por order
	const orderedModules = [...courseSeed.modules].sort(
		(a, b) => a.order - b.order
	);

	// Sembrar cada módulo
	for (const moduleSeed of orderedModules) {
		await seedModule(courseRecord.id, moduleSeed);
	}

	console.info(`✓ Course synced: ${courseSeed.title}`);
}

/**
 * Función principal del seed
 */
async function main() {
	console.info("Starting database seed...");

	const courseSeedData = [disinfectionCourse, safeStorageCourse];

	for (const course of courseSeedData) {
		try {
			await seedCourse(course);
		} catch (error) {
			console.error(
				`Failed to seed course "${course.title}":`,
				error instanceof Error ? error.message : error
			);
			console.error(
				"Stack trace:",
				error instanceof Error ? error.stack : "N/A"
			);
		}
	}

	console.info("✓ Database seed completed successfully");
}

main()
	.catch((error) => {
		console.error("Seed process failed:", error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
