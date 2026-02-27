import type { SeedCourse } from "../types";

export const introSafeWaterCourse: SeedCourse = {
	title: "Introducción al agua segura y protección de la fuente",
	description:
		"Conoce los fundamentos del agua segura, su relación con la salud y el enfoque de barreras múltiples para proteger a tu familia desde la fuente hasta el consumo.",
	imageUrl: "/images/courses/intro-tandas.png",
	category: "INTRODUCCIÓN",
	level: "INICIAL",
	status: "ACTIVO",
	modules: [
		{
			title: "Presentación de la plataforma",
			order: 1,
			duration: 20,
			content:
				"En este módulo conocerás la estructura de YAKU, cómo avanzar por los contenidos y cómo aplicar cada aprendizaje en tu hogar y comunidad.",
			videoUrl: "https://www.youtube.com/watch?v=QmVQZf5fQwQ",
			authorNote: "Video courtesy of partner foundation.",
			resources: [
				{
					type: "PDF",
					url: "resources/introduccion/presentacion/plataforma-yaku.pdf",
					title: "Guía rápida de uso de la plataforma",
					description:
						"Resumen de navegación, módulos y recomendaciones para completar los cursos.",
				},
			],
			quizzes: [
				{
					question: "¿Cuál es el objetivo principal de la plataforma YAKU?",
					explanation:
						"YAKU busca fortalecer prácticas de agua segura y prevención de enfermedades en el hogar y la comunidad.",
					options: [
						{ text: "Solo mostrar videos sin práctica.", isCorrect: false, order: 1 },
						{
							text: "Enseñar prácticas de agua segura aplicables en la vida diaria.",
							isCorrect: true,
							order: 2,
						},
						{ text: "Reemplazar todos los servicios de agua.", isCorrect: false, order: 3 },
						{ text: "Evaluar conocimientos sin capacitación.", isCorrect: false, order: 4 },
					],
				},
			],
		},
		{
			title: "El agua como derecho y salud",
			order: 2,
			duration: 25,
			content:
				"Este módulo explica por qué el acceso al agua segura es un derecho humano y cómo su calidad impacta directamente en la prevención de enfermedades.",
			videoUrl: "https://www.youtube.com/watch?v=4UNS_0C8vR8",
			authorNote: "Video courtesy of partner foundation.",
			resources: [
				{
					type: "PDF",
					url: "resources/introduccion/derecho-salud/agua-derecho-salud.pdf",
					title: "Agua segura, derecho y bienestar",
					description:
						"Material base sobre agua segura, salud pública y prevención de enfermedades.",
				},
			],
			quizzes: [
				{
					question: "¿Qué relación existe entre agua segura y salud?",
					explanation:
						"El agua segura reduce la transmisión de enfermedades y protege especialmente a niñas, niños y adultos mayores.",
					options: [
						{
							text: "No hay relación, solo importa la cantidad de agua.",
							isCorrect: false,
							order: 1,
						},
						{
							text: "El agua segura disminuye el riesgo de enfermedades de origen hídrico.",
							isCorrect: true,
							order: 2,
						},
						{ text: "Solo afecta el sabor de los alimentos.", isCorrect: false, order: 3 },
						{ text: "Solo es importante en zonas urbanas.", isCorrect: false, order: 4 },
					],
				},
			],
		},
		{
			title: "El concepto de barreras múltiples",
			order: 3,
			duration: 30,
			content:
				"Aprenderás a combinar protección de fuente, tratamiento y almacenamiento seguro para reducir el riesgo de contaminación del agua en cada etapa.",
			videoUrl: "https://www.youtube.com/watch?v=1qP2aJwY2oc",
			authorNote: "Video courtesy of partner foundation.",
			resources: [
				{
					type: "PDF",
					url: "resources/introduccion/barreras-multiples/enfoque-barreras.pdf",
					title: "Infografía: barreras múltiples",
					description:
						"Guía visual para aplicar barreras de protección desde la fuente hasta el consumo.",
				},
			],
			quizzes: [
				{
					question: "¿Qué significa aplicar barreras múltiples?",
					explanation:
						"Significa usar varias medidas complementarias para disminuir riesgos de contaminación en distintos momentos.",
					options: [
						{ text: "Aplicar una sola técnica y repetirla.", isCorrect: false, order: 1 },
						{
							text: "Combinar protección, tratamiento y almacenamiento seguro.",
							isCorrect: true,
							order: 2,
						},
						{ text: "Usar solo cloro en todas las situaciones.", isCorrect: false, order: 3 },
						{ text: "Hervir solo cuando el agua luce turbia.", isCorrect: false, order: 4 },
					],
				},
			],
		},
	],
};
