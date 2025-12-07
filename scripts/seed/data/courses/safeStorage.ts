import type { SeedCourse } from "../../types";

export const safeStorageCourse: SeedCourse = {
	title: "Almacenamiento seguro del agua en el hogar",
	description:
		"Aprende a almacenar y manejar el agua tratada en recipientes adecuados para evitar la recontaminación y mantenerla segura para el consumo.",
	imageUrl: "/images/courses/almacenamiento-seguro.jpg",
	category: "ALMACENAMIENTO SEGURO",
	level: "INICIAL",
	status: "ACTIVO",
	modules: [
		{
			title: "Riesgo de recontaminación y principios de almacenamiento seguro",
			order: 1,
			duration: 20,
			content: `En este módulo conocerás el concepto de recontaminación y por qué el almacenamiento seguro es una barrera clave dentro del enfoque TANDAS.

Aunque el agua haya sido tratada (por ejemplo, hervida, clorada o desinfectada con SODIS), puede volver a contaminarse si se manipula de forma inadecuada. La recontaminación puede ocurrir cuando:

- Se usan recipientes sucios.

- Se introducen manos o utensilios contaminados dentro del recipiente.

- El agua tratada se mezcla con agua cruda.

- El recipiente se deja destapado o expuesto a polvo, insectos o animales.

Principios básicos del almacenamiento seguro:

- Separar claramente el agua cruda del agua tratada.

- Usar recipientes limpios, con tapa y preferiblemente de boca estrecha o con grifo.

- Manipular el agua tratada con utensilios limpios que no toquen el interior del recipiente ni el agua restante.

- Ubicar los recipientes en un lugar elevado, fresco y protegido.

Al finalizar el módulo podrás explicar qué es la recontaminación y por qué el almacenamiento seguro es tan importante como el tratamiento mismo.`,
			resources: [
				{
					type: "PDF",
					url: "resources/guia-almacenamiento-seguro.pdf",
					title: "Guía básica: Almacenamiento seguro del agua",
					description:
						"Documento introductorio sobre recontaminación y principios de manejo del agua tratada.",
				},
				{
					type: "OTHER",
					url: "assets/infografia-recontaminacion.png",
					title: "Infografía: Cómo se recontamina el agua tratada",
					description:
						"Ilustración de prácticas inseguras comunes en el hogar que vuelven a contaminar el agua.",
				},
			],
			quiz: {
				question: "¿Qué es la recontaminación del agua tratada?",
				explanation:
					"La recontaminación ocurre cuando el agua que ya fue tratada se vuelve a contaminar por un manejo inseguro.",
				options: [
					{
						text: "Es el proceso de desinfectar el agua por segunda vez.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "Es cuando el agua previamente tratada vuelve a contaminarse por contacto con recipientes o utensilios sucios.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "Es cuando el agua se enfría después de hervir.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "Es cuando el agua se guarda en la nevera.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
		{
			title: "Elección y diseño de recipientes seguros",
			order: 2,
			duration: 25,
			content: `En este módulo aprenderás a identificar qué características debe tener un buen recipiente para almacenar agua tratada en el hogar.

Características recomendadas:

1. Tapa ajustada:

   - Evita la entrada de polvo, insectos y otros contaminantes.

2. Boca estrecha o grifo:

   - Reduce el contacto directo de manos y utensilios con el agua almacenada.

3. Material adecuado:

   - Plástico grado alimenticio, metal inoxidable u otros materiales que no liberen sustancias al agua.

   - Evitar recipientes que hayan contenido químicos tóxicos (por ejemplo, envases de pesticidas, combustibles o productos de limpieza).

4. Recipiente fácil de limpiar:

   - Superficie lisa y sin grietas profundas donde pueda acumularse suciedad.

Buenas prácticas adicionales:

- Diferenciar visualmente los recipientes para agua cruda y agua tratada (por ejemplo, con etiquetas o colores).

- Usar recipientes de tamaño adecuado según el consumo familiar, para asegurar rotación del agua y evitar almacenamiento prolongado innecesario.

Al finalizar, serás capaz de evaluar si un recipiente es adecuado para almacenar agua tratada y proponer mejoras sencillas de diseño y señalización.`,
			resources: [
				{
					type: "OTHER",
					url: "assets/poster-recipientes-seguros.png",
					title: "Poster: Recipientes seguros vs. no seguros",
					description:
						"Comparativo visual de recipientes recomendados y no recomendados para agua tratada.",
				},
				{
					type: "DOC",
					url: "resources/lista-chequeo-recipientes.docx",
					title: "Lista de chequeo: Evaluación de recipientes de agua",
					description:
						"Formato para que familias y promotores de salud evalúen recipientes en el hogar.",
				},
			],
			quiz: {
				question:
					"¿Cuál de las siguientes es una característica deseable en un recipiente para agua tratada?",
				explanation:
					"Una tapa ajustada ayuda a proteger el agua de contaminantes externos.",
				options: [
					{
						text: "Que no tenga tapa para que sea más fácil servir el agua.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "Que tenga una tapa ajustada que permanezca cerrada cuando no se usa.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "Que sea un envase que antes contenía pesticidas para aprovecharlo.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "Que tenga muchas grietas y dificultades para limpiarlo.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
		{
			title: "Manejo higiénico del agua tratada en el hogar",
			order: 3,
			duration: 30,
			content: `En este módulo aprenderás prácticas concretas para manipular el agua tratada de forma higiénica en el punto de uso.

Prácticas recomendadas:

- Servir el agua vertiéndola directamente desde el recipiente de almacenamiento hacia vasos limpios, evitando sumergirlos dentro.

- Usar cucharones o jarras limpias, reservados exclusivamente para el agua tratada.

- Lavarse las manos con agua y jabón antes de manipular los recipientes o servir el agua.

- Evitar que niños pequeños o animales toquen el interior del recipiente o el agua.

Limpieza de recipientes:

- Vaciar completamente el recipiente de vez en cuando para lavarlo con agua limpia y jabón.

- Enjuagar bien para evitar residuos de jabón.

- Dejar secar al aire en un lugar limpio antes de volver a llenarlo con agua tratada.

Ubicación de los recipientes:

- Colocarlos en lugares elevados, lejos del suelo y del alcance de animales.

- Evitar que estén cerca de basureros, letrinas o zonas de mucho polvo.

Al finalizar el módulo, podrás diseñar rutinas sencillas de manejo higiénico del agua tratada para tu hogar o para una comunidad.`,
			resources: [
				{
					type: "OTHER",
					url: "assets/infografia-manejo-higienico.png",
					title: "Infografía: Manejo higiénico del agua tratada",
					description:
						"Secuencia visual de buenas prácticas en el punto de uso.",
				},
				{
					type: "DOC",
					url: "resources/guia-rutina-limpieza-recipientes.docx",
					title: "Guía: Rutinas de limpieza y manejo higiénico",
					description:
						"Modelo de rutina diaria y semanal para familias y promotores comunitarios.",
				},
			],
			quiz: {
				question:
					"¿Cuál de las siguientes prácticas ayuda a mantener el agua tratada libre de recontaminación?",
				explanation:
					"Usar utensilios limpios y verter el agua sin introducir vasos en el recipiente protege el agua restante.",
				options: [
					{
						text: "Servir el agua introduciendo los vasos directamente dentro del recipiente grande.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "Verter el agua desde el recipiente hacia vasos limpios, sin introducir nada en su interior.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "Permitir que los niños jueguen con el agua dentro del recipiente.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "Guardar el recipiente abierto para que sea más fácil tomar agua.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
		{
			title:
				"Organización familiar y comunitaria para el almacenamiento seguro",
			order: 4,
			duration: 25,
			content: `En este módulo verás cómo integrar las prácticas de almacenamiento seguro en la organización diaria de la familia y de la comunidad.

En el hogar:

- Definir quiénes son responsables de tratar el agua, limpiar los recipientes y revisar la disponibilidad diaria.

- Establecer horarios para tratar y almacenar el agua (por ejemplo, en la noche después de hervir o clorar).

- Colocar recordatorios visuales (afiches, etiquetas) cerca de los recipientes.

En la comunidad:

- Elaborar acuerdos básicos sobre el manejo de recipientes en escuelas, centros de salud o puntos comunitarios de agua.

- Capacitar a líderes comunitarios y docentes para que modelen buenas prácticas.

- Registrar observaciones de problemas frecuentes (recipientes destapados, uso de envases inadecuados) y hacer retroalimentación periódica.

También se puede integrar:

- Monitoreo sencillo de cloro residual cuando se use cloración.

- Verificación de que los recipientes se encuentren en buen estado (sin grietas, con tapas en buen funcionamiento).

Al finalizar, podrás diseñar un pequeño plan de acción para que las prácticas de almacenamiento seguro no dependan solo de una persona, sino que se mantengan en el tiempo a nivel familiar y comunitario.`,
			resources: [
				{
					type: "DOC",
					url: "resources/plan-accion-almacenamiento-seguro.docx",
					title: "Plantilla: Plan de acción para almacenamiento seguro",
					description:
						"Formato para que familias y comunidades definan responsabilidades y acuerdos.",
				},
				{
					type: "OTHER",
					url: "assets/afiche-recordatorio-agua-segura.png",
					title: "Afiche recordatorio: Mantén tu agua segura",
					description:
						"Material para colocar en lugares visibles sobre buenas prácticas de almacenamiento.",
				},
			],
			quiz: {
				question:
					"¿Qué estrategia ayuda a que las prácticas de almacenamiento seguro se mantengan en el tiempo?",
				explanation:
					"Asignar responsabilidades y usar recordatorios visuales favorece la continuidad de las buenas prácticas.",
				options: [
					{
						text: "Depender únicamente de una persona sin comunicar las tareas a los demás.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "Definir responsables, horarios y usar recordatorios visuales en el hogar o comunidad.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "No hablar del tema para que la gente no se preocupe.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "Cambiar constantemente las normas para que nadie se acostumbre.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
		{
			title: "Riesgo de recontaminación - Parte 2",
			order: 5,
			duration: 15,
			content: `Continuación del módulo sobre recontaminación, enfocándonos en las acciones que aumentan el riesgo.`,
			quiz: {
				question:
					"¿Cuál de las siguientes acciones AUMENTA el riesgo de recontaminación?",
				explanation:
					"Introducir manos o vasos directamente en el recipiente facilita la llegada de microbios al agua.",
				options: [
					{
						text: "Servir el agua tratada vertiéndola desde un recipiente con tapa y boca estrecha.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "Introducir las manos o un vaso directamente dentro del recipiente de agua tratada.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "Mantener el recipiente tapado mientras no se está usando.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "Guardar los recipientes en un lugar elevado y limpio.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
		{
			title: "Elección de recipientes - Parte 2",
			order: 6,
			duration: 15,
			content: `Módulo complementario sobre buenas prácticas en la diferenciación de recipientes.`,
			quiz: {
				question:
					"¿Cuál es una buena práctica respecto al uso de recipientes para agua cruda y tratada?",
				explanation:
					"Diferenciar recipientes ayuda a evitar confusiones y mezclar agua cruda con agua tratada.",
				options: [
					{
						text: "Usar el mismo recipiente sin importar si el agua es cruda o tratada.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "Diferenciar claramente los recipientes de agua cruda y tratada, por ejemplo, con etiquetas o colores.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "Mezclar agua cruda y tratada en un solo recipiente para ahorrar espacio.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "No lavar nunca los recipientes para que la capa de suciedad proteja el agua.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
		{
			title: "Manejo higiénico - Parte 2",
			order: 7,
			duration: 15,
			content: `Módulo complementario sobre rutinas de limpieza de recipientes.`,
			quiz: {
				question:
					"¿Cuál es una buena rutina de limpieza para los recipientes de agua tratada?",
				explanation:
					"La limpieza periódica con agua y jabón y el secado en un lugar limpio ayuda a prevenir la acumulación de suciedad y microbios.",
				options: [
					{
						text: "No lavar nunca el recipiente para que conserve siempre el mismo sabor.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "Lavar el recipiente periódicamente con agua limpia y jabón, enjuagar bien y dejarlo secar en un lugar limpio.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "Lavar el recipiente solo con tierra y hojas.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "Lavar el recipiente y guardarlo húmedo en un lugar sucio.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
		{
			title: "Organización comunitaria - Parte 2",
			order: 8,
			duration: 15,
			content: `Módulo complementario sobre prácticas en puntos comunitarios.`,
			quiz: {
				question:
					"En un punto comunitario de agua (escuela, puesto de salud), ¿qué es recomendable hacer?",
				explanation:
					"Los acuerdos y la capacitación de responsables ayudan a cuidar el agua de toda la comunidad.",
				options: [
					{
						text: "Dejar que cada persona use cualquier recipiente sin reglas.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "Establecer acuerdos sobre el manejo de recipientes y capacitar a responsables en buenas prácticas.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "Permitir que los animales beban directamente del recipiente principal.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "No limpiar nunca los recipientes porque pertenecen a todos.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
	],
};
