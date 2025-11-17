import type { SeedCourse } from "../../types";

export const introTandasCourse: SeedCourse = {
	title: "Introducción al tratamiento de agua en el hogar (TANDAS)",
	description:
		"Curso básico para comprender por qué es necesario tratar el agua en casa, qué es el enfoque TANDAS y cómo el tratamiento domiciliario protege la salud de las familias.",
	imageUrl: "/images/courses/intro-tandas.jpg",
	category: "INTRODUCCIÓN",
	level: "BEGINNER",
	status: "ACTIVE",
	modules: [
		{
			title: "¿Por qué tratar el agua en casa?",
			order: 1,
			duration: 20,
			content: `En este módulo conocerás las razones de salud y bienestar por las que es importante tratar el agua en el hogar.

Hablaremos de cómo el agua contaminada puede transmitir enfermedades como la diarrea, el cólera y la fiebre tifoidea, y por qué los niños menores de cinco años y las personas con defensas bajas son los más vulnerables.

También veremos que, aunque una fuente sea "mejorada" (pozo protegido, grifo público, tubería), no siempre significa que el agua sea realmente segura. El agua puede contaminarse en la fuente, en las tuberías o dentro de la casa durante el transporte y el almacenamiento.

Al final del módulo, podrás explicar con tus propias palabras por qué el tratamiento y el almacenamiento seguro del agua en casa son una herramienta clave para proteger la salud de tu familia.`,
			resources: [
				{
					type: "PDF",
					url: "resources/cawst-introduccion-tandas.pdf",
					title:
						"Introducción al tratamiento del agua a nivel domiciliario (CAWST)",
					description:
						"Capítulos 1 y 2: motivos para tratar el agua en casa, TANDAS y enfoque de barreras múltiples.",
				},
				{
					type: "OTHER",
					url: "assets/infografia-motivos-tratar-agua.png",
					title: "Infografía: Motivos para tratar el agua en el hogar",
					description:
						"Resumen visual de los impactos de consumir agua no segura y beneficios del TANDAS.",
				},
			],
			quiz: {
				question:
					"¿Cuál es la principal razón para tratar el agua en el hogar?",
				explanation:
					"El objetivo central del tratamiento a nivel domiciliario es reducir la presencia de agentes patógenos que causan enfermedades como la diarrea.",
				options: [
					{
						text: "Mejorar solo el color y el sabor del agua, sin importar los gérmenes.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "Reducir o eliminar los microorganismos que causan enfermedades antes de beber el agua.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "Hacer que el agua sea más fría y agradable para tomar.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "Evitar tener que caminar hasta la fuente de agua.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
		{
			title: "¿Qué es TANDAS y el enfoque de barreras múltiples?",
			order: 2,
			duration: 25,
			content: `En este módulo aprenderás qué significa TANDAS: Tratamiento del Agua a Nivel Domiciliario y su Almacenamiento Seguro.

Veremos que TANDAS se basa en el enfoque de barreras múltiples: una serie de pasos que, combinados, reducen progresivamente el riesgo de contaminación del agua:

- Protección de la fuente
- Sedimentación
- Filtración
- Desinfección
- Almacenamiento seguro

Entenderás que ningún paso, por sí solo, es perfecto; pero al combinarlos se logra una mejora radical en la calidad microbiológica del agua y una reducción importante de las enfermedades diarreicas.

Al terminar, podrás reconocer en tu contexto qué barreras ya se aplican y cuáles faltan por implementar en tu hogar o comunidad.`,
			resources: [
				{
					type: "PDF",
					url: "resources/cawst-introduccion-tandas.pdf",
					title: "Enfoque de barreras múltiples (CAWST)",
					description:
						"Sección sobre sedimentación, filtración, desinfección y almacenamiento seguro como partes del proceso TANDAS.",
				},
				{
					type: "VIDEO",
					url: "videos/intro-tandas/enfoque-barreras-multiples.mp4",
					title: "Video animado: Barreras múltiples para agua segura",
					description:
						"Animación que muestra el camino del agua desde la fuente hasta el hogar y las barreras TANDAS.",
				},
			],
			quiz: {
				question:
					"¿Cuál de las siguientes opciones describe mejor el enfoque de barreras múltiples?",
				explanation:
					"Las barreras múltiples combinan varias etapas (protección de la fuente, tratamiento y almacenamiento seguro) para reducir el riesgo paso a paso.",
				options: [
					{
						text: "Usar un solo método de tratamiento, pero muy intensivo.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "Aplicar varias etapas de tratamiento y almacenamiento seguro para reducir el riesgo poco a poco.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "Hervir el agua solo cuando alguien está enfermo.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "Cambiar de fuente de agua cada semana.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
		{
			title: "Conceptos básicos de calidad del agua",
			order: 3,
			duration: 30,
			content: `En este módulo conocerás tres aspectos clave para entender la calidad del agua:

1. Aspecto biológico: bacterias, virus, protozoos y helmintos que pueden causar enfermedades.

2. Aspecto químico: sustancias como arsénico, fluoruro, nitratos, hierro y manganeso.

3. Aspecto físico: turbidez, color, sabor, olor y temperatura.

Aprenderás que:

- La prioridad es eliminar o reducir los agentes patógenos, porque son la principal amenaza para la salud.

- Algunas sustancias químicas pueden causar problemas si están presentes por mucho tiempo o en altas concentraciones.

- El hecho de que el agua se vea cristalina no significa que sea segura; puede contener microbios invisibles.

El objetivo es que puedas identificar, en lenguaje sencillo, qué riesgos principales puede tener el agua de tu comunidad y por qué el tratamiento domiciliario se concentra en mejorar sobre todo la calidad microbiológica.`,
			resources: [
				{
					type: "PDF",
					url: "resources/cawst-introduccion-tandas.pdf",
					title: "Calidad del agua: aspectos biológicos, químicos y físicos",
					description:
						"Sección 2 del manual: contaminantes biológicos, químicos y físicos y su importancia para la salud.",
				},
				{
					type: "OTHER",
					url: "assets/poster-calidad-agua-triple-aspecto.png",
					title: "Poster: Tres aspectos de la calidad del agua",
					description:
						"Material visual para usar en talleres comunitarios sobre calidad del agua.",
				},
			],
			quiz: {
				question:
					"Cuando hablamos del aspecto biológico de la calidad del agua, ¿a qué nos referimos?",
				explanation:
					"El aspecto biológico se refiere a microorganismos como bacterias, virus, protozoos y gusanos que pueden causar enfermedades.",
				options: [
					{
						text: "Al color, olor y temperatura del agua.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "A los microorganismos como bacterias, virus, protozoos y helmintos.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "Solo a las sustancias químicas como el arsénico y el fluoruro.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "Al tamaño del recipiente donde se guarda el agua.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
		{
			title: "Conceptos básicos de calidad del agua - Parte 2",
			order: 4,
			duration: 15,
			content: `Continuación del módulo anterior sobre calidad del agua, enfocándonos en el aspecto físico y su importancia para la aceptación comunitaria.`,
			quiz: {
				question:
					"¿Qué afirmación es correcta sobre el aspecto físico del agua?",
				explanation:
					"La turbidez, el color, el sabor y el olor son características físicas; el agua clara puede seguir estando contaminada con microorganismos.",
				options: [
					{
						text: "Si el agua es cristalina, siempre es segura para beber.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "La turbidez, el color y el olor son ejemplos de características físicas del agua.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "El aspecto físico solo se refiere a la temperatura del agua.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "El aspecto físico del agua no importa para la aceptación por parte de la comunidad.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
	],
};
