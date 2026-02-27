import type { SeedCourse } from "../types";

export const sedimentationCourse: SeedCourse = {
	title: "Sedimentación",
	description:
		"Aprende a reducir la turbidez del agua mediante coagulación y decantación para mejorar la efectividad de los tratamientos posteriores.",
	imageUrl: "/images/courses/sedimentacion-agua.png",
	category: "SEDIMENTACIÓN",
	level: "INICIAL",
	status: "ACTIVO",
	modules: [
		{
			title: "Qué es la turbidez y por qué eliminarla",
			order: 1,
			duration: 25,
			content:
				"Este módulo explica qué es la turbidez, cómo afecta la salud y por qué su reducción es un paso previo clave antes de desinfectar el agua.",
			videoUrl: "https://www.youtube.com/watch?v=y2nAA2meL3A",
			authorNote: "Video courtesy of partner foundation.",
			resources: [
				{
					type: "PDF",
					url: "resources/sedimentacion/turbidez/que-es-turbidez.pdf",
					title: "Guía: comprensión de la turbidez",
					description: "Conceptos básicos para identificar agua turbia y riesgos asociados.",
				},
			],
			quizzes: [
				{
					question: "¿Por qué es importante reducir la turbidez antes de desinfectar?",
					explanation:
						"La turbidez puede proteger microorganismos y disminuir la eficacia de métodos como cloración o SODIS.",
					options: [
						{ text: "Solo para mejorar el color del agua.", isCorrect: false, order: 1 },
						{
							text: "Porque mejora la eficacia de la desinfección posterior.",
							isCorrect: true,
							order: 2,
						},
						{ text: "Porque elimina metales pesados automáticamente.", isCorrect: false, order: 3 },
						{ text: "No es necesario reducirla nunca.", isCorrect: false, order: 4 },
					],
				},
			],
		},
		{
			title: "Uso de coagulantes naturales y químicos",
			order: 2,
			duration: 35,
			content:
				"Conocerás cómo los coagulantes ayudan a agrupar partículas finas para facilitar su remoción durante la decantación.",
			videoUrl: "https://www.youtube.com/watch?v=frk5l1ID6iU",
			authorNote: "Video courtesy of partner foundation.",
			resources: [
				{
					type: "PDF",
					url: "resources/sedimentacion/coagulantes/uso-coagulantes.pdf",
					title: "Guía práctica de coagulantes",
					description:
						"Instrucciones básicas para dosificar y mezclar coagulantes de forma segura.",
				},
			],
			quizzes: [
				{
					question: "¿Cuál es la función principal de un coagulante?",
					explanation:
						"Los coagulantes agrupan partículas pequeñas en flóculos más grandes para que se asienten más rápido.",
					options: [
						{ text: "Agregar sabor al agua.", isCorrect: false, order: 1 },
						{
							text: "Agrupar partículas para facilitar su sedimentación.",
							isCorrect: true,
							order: 2,
						},
						{ text: "Eliminar totalmente químicos disueltos.", isCorrect: false, order: 3 },
						{ text: "Reemplazar el almacenamiento seguro.", isCorrect: false, order: 4 },
					],
				},
			],
		},
		{
			title: "El proceso de decantación",
			order: 3,
			duration: 30,
			content:
				"Aprenderás a dejar reposar el agua en condiciones adecuadas para separar sólidos y obtener agua más clara para filtrar o desinfectar.",
			videoUrl: "https://www.youtube.com/watch?v=5kP8gB7JjQ4",
			authorNote: "Video courtesy of partner foundation.",
			resources: [
				{
					type: "PDF",
					url: "resources/sedimentacion/decantacion/proceso-decantacion.pdf",
					title: "Paso a paso de decantación domiciliaria",
					description:
						"Procedimiento simple para decantar agua en casa sin recontaminarla.",
				},
			],
			quizzes: [
				{
					question: "¿Qué acción ayuda a que la decantación sea más efectiva?",
					explanation:
						"El agua debe permanecer en reposo sin agitación para que las partículas se depositen en el fondo.",
					options: [
						{ text: "Agitar constantemente el recipiente.", isCorrect: false, order: 1 },
						{
							text: "Mantener el agua en reposo el tiempo recomendado.",
							isCorrect: true,
							order: 2,
						},
						{ text: "Mezclar con agua sin tratar al final.", isCorrect: false, order: 3 },
						{ text: "Decantar en recipientes sucios.", isCorrect: false, order: 4 },
					],
				},
			],
		},
	],
};
