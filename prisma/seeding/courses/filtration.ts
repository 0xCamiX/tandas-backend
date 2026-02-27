import type { SeedCourse } from "../types";

export const filtrationCourse: SeedCourse = {
	title: "Filtración",
	description:
		"Aprende técnicas de filtración para remover partículas y mejorar la calidad del agua antes de la desinfección y el almacenamiento.",
	imageUrl: "/images/courses/filtracion-agua.png",
	category: "FILTRACIÓN",
	level: "INICIAL",
	status: "ACTIVO",
	modules: [
		{
			title: "Filtros de tela (emergencia)",
			order: 1,
			duration: 20,
			content:
				"Conocerás cómo usar tela limpia como prefiltrado en situaciones de emergencia para reducir sólidos gruesos en el agua.",
			videoUrl: "https://www.youtube.com/watch?v=8w4fK2fR5Qc",
			authorNote: "Video courtesy of partner foundation.",
			resources: [
				{
					type: "PDF",
					url: "resources/filtracion/tela/filtro-tela-emergencia.pdf",
					title: "Uso seguro de filtros de tela",
					description:
						"Procedimiento rápido para prefiltrar agua con tela limpia y reducir turbidez visible.",
				},
			],
			quizzes: [
				{
					question: "¿Para qué sirve un filtro de tela en emergencia?",
					explanation:
						"Sirve como pretratamiento para remover partículas grandes, no como desinfección final.",
					options: [
						{ text: "Desinfectar completamente el agua.", isCorrect: false, order: 1 },
						{
							text: "Reducir partículas visibles antes de otro tratamiento.",
							isCorrect: true,
							order: 2,
						},
						{ text: "Agregar cloro al agua automáticamente.", isCorrect: false, order: 3 },
						{ text: "Eliminar contaminantes químicos disueltos.", isCorrect: false, order: 4 },
					],
				},
			],
		},
		{
			title: "Funcionamiento del filtro bioarena",
			order: 2,
			duration: 35,
			content:
				"Revisarás cómo el filtro bioarena retiene partículas y reduce microorganismos mediante procesos físicos y biológicos.",
			videoUrl: "https://www.youtube.com/watch?v=1z4mbIhfP3Q",
			authorNote: "Video courtesy of partner foundation.",
			resources: [
				{
					type: "PDF",
					url: "resources/filtracion/bioarena/funcionamiento-bioarena.pdf",
					title: "Manual básico del filtro bioarena",
					description:
						"Conceptos de operación, mantenimiento y rendimiento del filtro bioarena.",
				},
			],
			quizzes: [
				{
					question: "¿Cuál es una ventaja del filtro bioarena?",
					explanation:
						"Puede reducir turbidez y carga microbiana cuando se usa y mantiene correctamente.",
					options: [
						{ text: "No requiere limpieza ni mantenimiento.", isCorrect: false, order: 1 },
						{
							text: "Mejora la calidad del agua por filtración física y biológica.",
							isCorrect: true,
							order: 2,
						},
						{ text: "Sustituye todas las barreras posteriores.", isCorrect: false, order: 3 },
						{ text: "Funciona igual aunque esté dañado.", isCorrect: false, order: 4 },
					],
				},
			],
		},
		{
			title: "Uso y limpieza de filtros cerámicos",
			order: 3,
			duration: 30,
			content:
				"Aprenderás prácticas correctas para usar, limpiar y proteger filtros cerámicos sin comprometer su capacidad de filtración.",
			videoUrl: "https://www.youtube.com/watch?v=s7apvZxZ3wE",
			authorNote: "Video courtesy of partner foundation.",
			resources: [
				{
					type: "PDF",
					url: "resources/filtracion/ceramico/uso-limpieza-ceramico.pdf",
					title: "Guía de cuidado del filtro cerámico",
					description:
						"Recomendaciones para limpieza, manipulación y frecuencia de mantenimiento.",
				},
			],
			quizzes: [
				{
					question: "¿Qué cuidado es clave en filtros cerámicos?",
					explanation:
						"Una limpieza suave y regular evita obstrucciones sin dañar la estructura del filtro.",
					options: [
						{ text: "Golpear el filtro para limpiar rápido.", isCorrect: false, order: 1 },
						{
							text: "Limpiar de forma suave y con higiene adecuada.",
							isCorrect: true,
							order: 2,
						},
						{ text: "Usarlo aunque esté rajado.", isCorrect: false, order: 3 },
						{ text: "Guardar el filtro sin tapa en exteriores.", isCorrect: false, order: 4 },
					],
				},
			],
		},
		{
			title: "Uso y limpieza de filtros",
			order: 4,
			duration: 25,
			content:
				"Este módulo resume buenas prácticas comunes para operación, limpieza y reemplazo oportuno de filtros domiciliarios.",
			videoUrl: "https://www.youtube.com/watch?v=Ff8Xf2s8fA0",
			authorNote: "Video courtesy of partner foundation.",
			resources: [
				{
					type: "PDF",
					url: "resources/filtracion/general/uso-limpieza-filtros.pdf",
					title: "Checklist de mantenimiento de filtros",
					description:
						"Lista práctica para verificar higiene, estado y reemplazo de componentes.",
				},
			],
			quizzes: [
				{
					question: "¿Qué práctica ayuda a mantener el rendimiento de un filtro?",
					explanation:
						"La limpieza periódica y el reemplazo de componentes según indicación del fabricante mantienen su eficacia.",
					options: [
						{ text: "No limpiarlo para conservar una capa protectora.", isCorrect: false, order: 1 },
						{
							text: "Realizar mantenimiento periódico y recambios cuando corresponda.",
							isCorrect: true,
							order: 2,
						},
						{ text: "Usarlo con agua contaminada por químicos industriales.", isCorrect: false, order: 3 },
						{ text: "Mezclar agua filtrada y sin filtrar.", isCorrect: false, order: 4 },
					],
				},
			],
		},
	],
};
