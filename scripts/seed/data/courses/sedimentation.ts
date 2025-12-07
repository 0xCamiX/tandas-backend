import type { SeedCourse } from "../../types";

export const sedimentationCourse: SeedCourse = {
	title: "Sedimentación del agua en el hogar",
	description:
		"Aprende a reducir la turbidez del agua mediante sedimentación simple y mejorada (coagulación-floculación), como primer paso de pretratamiento antes de la desinfección.",
	imageUrl: "/images/courses/sedimentacion-agua.jpg",
	category: "SEDIMENTACIÓN",
	level: "INICIAL",
	status: "ACTIVO",
	modules: [
		{
			title: "¿Qué es la sedimentación y por qué es importante?",
			order: 1,
			duration: 20,
			content: `En este módulo conocerás el concepto de sedimentación como método de pretratamiento del agua.

La sedimentación consiste en dejar reposar el agua para que la fuerza de la gravedad haga que las partículas más pesadas (barro, arena fina, materia orgánica) se vayan al fondo del recipiente. De esta manera se reduce la turbidez y parte de la carga microbiana asociada a esas partículas.

También comprenderás que:

- La sedimentación NO hace que el agua sea completamente segura.

- No elimina todos los microorganismos ni sustancias químicas disueltas.

- Es un paso que ayuda a que los métodos de desinfección (por ejemplo cloración, hervido o SODIS) sean mucho más efectivos y requieran menos esfuerzo o menos producto.

Al final del módulo, podrás explicar con tus palabras qué es la sedimentación, qué logra y qué NO logra por sí sola en términos de calidad del agua.`,
			resources: [
				{
					type: "PDF",
					url: "resources/cawst-tratamiento-domiciliario.pdf",
					title:
						"Tratamiento del agua a nivel domiciliario - Sección Sedimentación",
					description:
						"Capítulos del manual CAWST donde se explica la sedimentación como pretratamiento.",
				},
				{
					type: "OTHER",
					url: "assets/ilustracion-sedimentacion-basica.png",
					title: "Ilustración: Agua antes y después de sedimentar",
					description:
						"Imagen comparando un recipiente con agua turbia antes y después del reposo.",
				},
			],
			quiz: {
				question:
					"¿Cuál es el objetivo principal de la sedimentación en el tratamiento de agua en el hogar?",
				explanation:
					"La sedimentación busca reducir la turbidez y parte de la carga microbiana asociada a las partículas en suspensión, no garantiza por sí sola agua totalmente segura.",
				options: [
					{
						text: "Eliminar completamente todos los gérmenes y sustancias químicas del agua.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "Reducir la turbidez y algunas impurezas dejando que las partículas pesadas se asienten en el fondo.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "Cambiar el sabor del agua para que sea más agradable.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "Hacer que el agua huela mejor sin necesidad de otros pasos.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
		{
			title: "Sedimentación simple paso a paso en casa",
			order: 2,
			duration: 25,
			content: `En este módulo aprenderás cómo aplicar la sedimentación simple en el hogar utilizando materiales que ya tienes o que son fáciles de conseguir.

Veremos los pasos básicos:

1. Llenar un recipiente limpio con el agua cruda.

2. Evitar agitar el agua después de llenarlo.

3. Dejar reposar el agua el tiempo suficiente (por ejemplo, varias horas o toda la noche) para que las partículas pesadas decanten.

4. Observar la separación entre la parte clara y los sedimentos en el fondo.

5. Trasvasar o sacar con cuidado el agua más clara desde la parte superior a otro recipiente limpio, sin remover el fondo.

También hablaremos de:

- Elegir recipientes adecuados (cubetas, baldes, garrafas) que permitan ver el fondo.

- Por qué no se debe beber el agua directamente del mismo recipiente donde se acumulan los sedimentos.

- Cómo combinar la sedimentación simple con otros pasos de tratamiento (filtración, desinfección y almacenamiento seguro).

Al finalizar, sabrás cómo explicar e implementar un procedimiento simple de sedimentación para tu familia o comunidad.`,
			videoUrl: "videos/sedimentacion/sedimentacion-simple-casa.mp4",
			resources: [
				{
					type: "VIDEO",
					url: "videos/sedimentacion/sedimentacion-simple-casa.mp4",
					title: "Video: Sedimentación simple en casa",
					description:
						"Demostración paso a paso de sedimentación simple usando baldes transparentes.",
				},
				{
					type: "DOC",
					url: "resources/guia-practica-sedimentacion-simple.docx",
					title: "Guía práctica: Sedimentación simple a nivel domiciliario",
					description:
						"Instrucciones impresas para usar en talleres o capacitaciones comunitarias.",
				},
			],
			quiz: {
				question:
					"¿Cuál de los siguientes pasos es FUNDAMENTAL para que la sedimentación simple funcione bien?",
				explanation:
					"Es clave dejar reposar el agua sin agitarla, para que las partículas tengan tiempo de asentarse.",
				options: [
					{
						text: "Mover el agua cada pocos minutos para acelerar el proceso.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "Dejar reposar el agua el tiempo suficiente sin mover el recipiente.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "Beber primero el agua del fondo, donde se ven los sedimentos.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "Cambiar de recipiente cada 5 minutos.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
		{
			title: "Sedimentación mejorada: coagulación y floculación",
			order: 3,
			duration: 30,
			content: `En este módulo conocerás la sedimentación mejorada, también llamada coagulación-floculación.

Cuando el agua es muy turbia, dejarla reposar puede no ser suficiente. En estos casos se pueden usar coagulantes (como alumbre, sales de hierro o semillas de moringa) para ayudar a que las partículas muy pequeñas se agrupen en flóculos más grandes y pesados, que se asientan más rápido.

Veremos:

1. Qué es un coagulante y cómo ayuda a clarificar el agua.

2. Ejemplos de coagulantes de bajo costo o de origen local (por ejemplo, semillas de moringa en polvo).

3. Pasos generales del proceso:

   - Medir o estimar la cantidad adecuada de coagulante.

   - Mezclar fuertemente por un corto tiempo.

   - Mezclar suavemente para permitir la formación de flóculos.

   - Dejar reposar para que los flóculos sedimenten.

   - Retirar con cuidado el agua clara de la parte superior.

También se enfatizará que:

- Si se usa un coagulante químico, es importante seguir las dosis recomendadas.

- La coagulación-floculación tampoco elimina todos los patógenos, por lo que SIEMPRE debe combinarse con un método de desinfección posterior.

- No se debe beber ni usar el agua que queda directamente sobre los sedimentos o flóculos.

Al finalizar, serás capaz de describir la sedimentación mejorada y explicar por qué es especialmente útil en aguas con alta turbidez.`,
			resources: [
				{
					type: "PDF",
					url: "resources/hoja-tecnica-coagulacion-floculacion.pdf",
					title: "Hoja técnica: Coagulación y floculación en el hogar",
					description:
						"Resumen técnico y práctico sobre el uso de coagulantes para mejorar la sedimentación.",
				},
				{
					type: "OTHER",
					url: "assets/infografia-coagulacion-moringa.png",
					title: "Infografía: Uso de semillas de moringa como coagulante",
					description:
						"Material gráfico para explicar la dosificación básica y el proceso general.",
				},
			],
			quiz: {
				question:
					"¿Qué función cumple el coagulante en la sedimentación mejorada?",
				explanation:
					"El coagulante ayuda a que las partículas muy pequeñas se unan formando flóculos más grandes y pesados que sedimentan más rápido.",
				options: [
					{
						text: "Cambiar el color del agua únicamente.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "Unir las partículas pequeñas en flóculos más grandes para que se asienten con mayor rapidez.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "Hervir el agua sin necesidad de calor.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "Agregar sabor dulce al agua para que sea más aceptada.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
		{
			title: "Sedimentación mejorada: coagulación y floculación - Parte 2",
			order: 4,
			duration: 15,
			content: `Continuación del módulo anterior sobre coagulación y floculación, enfocándonos en las mejores prácticas y precauciones.`,
			quiz: {
				question:
					"Después de aplicar coagulación-floculación, ¿qué afirmación es correcta?",
				explanation:
					"La coagulación-floculación mejora la clarificación, pero no inactiva por completo a todos los microorganismos; se debe combinar con desinfección.",
				options: [
					{
						text: "El agua ya es completamente segura y no requiere desinfección.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "Se debe combinar con un método de desinfección (cloro, hervido, SODIS) para aumentar la seguridad del agua.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "Solo se utiliza en agua que ya es cristalina.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "Es suficiente beber el agua que está sobre los flóculos sin ningún cuidado.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
	],
};
