import type { SeedCourse } from "../../types";

export const disinfectionCourse: SeedCourse = {
	title: "Desinfección del agua en el hogar",
	description:
		"Conoce y aplica métodos de desinfección como el hervido, la cloración y la desinfección solar (SODIS) para inactivar microorganismos y hacer el agua más segura para beber.",
	imageUrl: "/images/courses/desinfeccion-agua.jpg",
	category: "DESINFECCIÓN",
	level: "BEGINNER",
	status: "ACTIVE",
	modules: [
		{
			title: "Fundamentos de la desinfección del agua",
			order: 1,
			duration: 20,
			content: `En este módulo conocerás qué significa desinfectar el agua y por qué esta etapa es esencial dentro del enfoque de barreras múltiples.

Desinfectar el agua consiste en inactivar o eliminar microorganismos patógenos (bacterias, virus y protozoos) que pueden causar enfermedades diarreicas y otros problemas de salud. La desinfección se aplica normalmente después de uno o varios pasos de pretratamiento (sedimentación, filtración), especialmente cuando el agua es muy turbia.

Ideas clave:

- La prioridad es reducir los gérmenes que causan enfermedades, más que mejorar solo el sabor o el color.

- La turbidez alta dificulta la desinfección, porque las partículas pueden "proteger" a los microorganismos.

- Ningún método es perfecto; por eso la combinación de pretratamiento + desinfección + almacenamiento seguro aumenta mucho la protección.

Al finalizar el módulo podrás explicar qué es la desinfección, en qué se diferencia del pretratamiento físico y por qué es tan importante para la salud de tu familia.`,
			resources: [
				{
					type: "PDF",
					url: "resources/cawst-desinfeccion-fundamentos.pdf",
					title: "Fundamentos de desinfección del agua a nivel domiciliario",
					description:
						"Documento base sobre principios de desinfección física y química del agua.",
				},
				{
					type: "OTHER",
					url: "assets/infografia-pretratamiento-desinfeccion.png",
					title: "Infografía: De la turbidez a la desinfección",
					description:
						"Relación entre turbidez, pretratamiento y eficacia de la desinfección.",
				},
			],
			quiz: {
				question:
					"¿Cuál es el objetivo principal de la desinfección del agua en el hogar?",
				explanation:
					"La desinfección busca inactivar o eliminar microorganismos patógenos que causan enfermedades.",
				options: [
					{
						text: "Eliminar únicamente el mal olor del agua.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "Inactivar o eliminar microorganismos que pueden causar enfermedades.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "Cambiar el color del agua para que se vea más clara.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "Hacer que el agua sea más fría y refrescante.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
		{
			title: "Hervido y pasteurización del agua",
			order: 2,
			duration: 25,
			content: `En este módulo aprenderás a usar el calor para desinfectar el agua mediante el hervido y la pasteurización.

Hervido:

- Llevar el agua a ebullición (cuando salen burbujas grandes de forma continua).

- Mantenerla hirviendo al menos 1 minuto; en zonas de mayor altitud se recomienda hervirla por más tiempo.

- Dejar enfriar el agua en el mismo recipiente, evitando introducir utensilios sucios.

- Guardarla en un recipiente limpio y tapado para prevenir recontaminación.

Pasteurización:

- Consiste en calentar el agua a una temperatura menor que la de ebullición, pero suficiente y durante el tiempo adecuado para inactivar microorganismos.

- Requiere algún método para controlar la temperatura, como indicadores de pasteurización, y no siempre es fácil de implementar en todos los hogares.

Ventajas del hervido:

- Destruye la mayoría de bacterias, virus y protozoos.

- Es una técnica conocida por muchas familias.

Limitaciones:

- Requiere combustible (gas, leña, electricidad).

- Puede cambiar el sabor del agua.

- No elimina contaminantes químicos ni sedimentos.

- Si no se almacena correctamente, el agua puede recontaminarse.

Al finalizar, podrás enseñar a otras personas cómo hervir el agua de manera segura y cuáles son sus ventajas y limitaciones.`,
			videoUrl: "videos/desinfeccion/hervido-agua-segura.mp4",
			resources: [
				{
					type: "VIDEO",
					url: "videos/desinfeccion/hervido-agua-segura.mp4",
					title: "Video: Cómo hervir el agua de forma segura",
					description:
						"Demostración paso a paso del hervido, desde la toma del agua hasta su almacenamiento.",
				},
				{
					type: "DOC",
					url: "resources/guia-hervido-pasteurizacion.docx",
					title: "Guía práctica: Hervido y pasteurización",
					description:
						"Documento para talleres que resume los pasos y recomendaciones.",
				},
			],
			quiz: {
				question:
					"¿Cuál es una recomendación correcta al hervir el agua para desinfectarla?",
				explanation:
					"Mantener el agua en ebullición por al menos 1 minuto ayuda a inactivar la mayoría de microorganismos.",
				options: [
					{
						text: "Apagar el fuego justo cuando aparecen las primeras burbujas pequeñas.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "Mantener el agua en ebullición continua por al menos 1 minuto.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "Hervir el agua solo si tiene mal olor.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "Hervirla durante unos segundos y mezclarla con agua sin hervir.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
		{
			title: "Cloración segura del agua en el hogar",
			order: 3,
			duration: 30,
			content: `En este módulo aprenderás a usar cloro para desinfectar el agua en el hogar de manera segura.

La cloración consiste en añadir una cantidad calculada de cloro (por ejemplo, hipoclorito de sodio o tabletas de cloro) al agua para inactivar bacterias y muchos virus, y dejar un pequeño residual que proteja el agua de recontaminaciones durante su almacenamiento.

Pasos generales:

1. Verificar que el agua tenga baja turbidez (idealmente pretratada).

2. Medir la cantidad correcta de cloro según la concentración del producto y el volumen de agua.

3. Mezclar bien y dejar reposar el agua el tiempo recomendado (por ejemplo, 30 minutos).

4. Comprobar que haya un leve olor a cloro, pero que no sea excesivo.

Aspectos importantes:

- Si el agua está muy turbia, las partículas pueden consumir el cloro y proteger a los microorganismos.

- La dosificación debe ser adecuada: muy poco no desinfecta; demasiado puede afectar el sabor y la aceptación.

- Algunos protozoos con quistes resistentes (por ejemplo, Cryptosporidium) no se eliminan fácilmente solo con cloro; por eso es recomendable combinar con sedimentación/filtración.

Se resaltará también la importancia de:

- Guardar el cloro en envases cerrados, lejos del sol y fuera del alcance de niños.

- No mezclar cloro con otros productos químicos domésticos.

- Explicar a la comunidad que el ligero olor a cloro indica protección, no contaminación.

Al finalizar, podrás calcular y aplicar dosis sencillas de cloro en situaciones comunitarias, siguiendo una tabla o guía de dosificación.`,
			resources: [
				{
					type: "PDF",
					url: "resources/tabla-dosis-cloro-domiciliario.pdf",
					title: "Tabla de dosificación de cloro para uso domiciliario",
					description:
						"Guía simple para calcular cuántas gotas o tabletas usar según el volumen de agua.",
				},
				{
					type: "OTHER",
					url: "assets/cartel-cloracion-segura.png",
					title: "Cartel: Cloración segura paso a paso",
					description:
						"Material visual para colocar en escuelas, puestos de salud y puntos de agua.",
				},
			],
			quiz: {
				question:
					"¿Por qué es importante medir la dosis de cloro antes de agregarla al agua?",
				explanation:
					"Una dosificación correcta asegura que haya suficiente cloro para desinfectar sin afectar innecesariamente el sabor.",
				options: [
					{
						text: "Porque el cloro solo funciona si se agrega al ojo, sin necesidad de cálculo.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "Porque muy poco cloro no desinfecta bien y demasiado puede cambiar el sabor del agua.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "Porque el cloro se evapora de inmediato y no tiene efecto.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "Porque la dosis no tiene importancia, siempre funciona igual.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
		{
			title: "Desinfección solar (SODIS) y otras tecnologías UV",
			order: 4,
			duration: 30,
			content: `En este módulo aprenderás a usar el sol como aliado para desinfectar el agua mediante el método SODIS (Desinfección Solar) y conocerás otras tecnologías basadas en luz ultravioleta.

SODIS:

- Consiste en llenar botellas PET transparentes con agua clara (baja turbidez) y exponerlas al sol.

- Las botellas se colocan en posición horizontal, sobre techos o superficies que reciban sol directo.

- Se recomienda un mínimo de 6 horas de exposición en días soleados; en días muy nublados, puede requerirse hasta 48 horas.

- La combinación de radiación UV-A, aumento de temperatura y oxígeno disuelto ayuda a inactivar bacterias, virus y algunos protozoos.

Requisitos y cuidados:

- El agua debe estar lo más clara posible; si es turbia, debe pretratarse (sedimentación/filtración).

- Usar botellas transparentes y limpias, sin etiquetas que bloqueen la luz.

- No usar botellas muy grandes, para que la luz penetre mejor.

- Evitar recontaminar el agua al abrir y servir: no introducir manos ni utensilios sucios.

Otras tecnologías UV:

- Lámparas UV o equipos portátiles que desinfectan el agua al exponerla a luz ultravioleta.

- Requieren energía (baterías, electricidad) y cierto mantenimiento.

- Pueden ser útiles en instituciones o en hogares con acceso a energía estable.

Limitaciones generales:

- SODIS no deja un residual desinfectante, por lo que el agua debe manipularse con cuidado tras la exposición.

- La eficacia disminuye en condiciones de baja radiación solar o turbidez alta.

Al finalizar, podrás explicar cuándo es apropiado usar SODIS, cómo implementarlo correctamente y qué precauciones tomar.`,
			resources: [
				{
					type: "PDF",
					url: "resources/manual-sodis-comunitario.pdf",
					title: "Manual comunitario: Desinfección solar del agua (SODIS)",
					description:
						"Instrucciones detalladas para implementar SODIS en comunidades rurales.",
				},
				{
					type: "OTHER",
					url: "assets/infografia-sodis-pasos.png",
					title: "Infografía: Pasos del método SODIS",
					description:
						"Guía visual para colocar en escuelas, hogares y centros comunitarios.",
				},
			],
			quiz: {
				question:
					"Para aplicar correctamente el método SODIS, ¿cuál de las siguientes condiciones es NECESARIA?",
				explanation:
					"El agua debe ser clara y la botella debe recibir sol directo durante varias horas para que el método sea efectivo.",
				options: [
					{
						text: "Usar siempre agua muy turbia sin ningún pretratamiento.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "Usar botellas transparentes con agua clara y exponerlas varias horas al sol directo.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "Usar botellas opacas para que el agua no reciba luz.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "Exponer las botellas solo 10 minutos al sol.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
		{
			title: "Fundamentos de la desinfección - Parte 2",
			order: 5,
			duration: 15,
			content: `Continuación del módulo sobre fundamentos de la desinfección, enfocándonos en la relación entre turbidez y eficacia.`,
			quiz: {
				question:
					"¿Por qué es importante reducir la turbidez antes de desinfectar?",
				explanation:
					"La turbidez puede proteger a los microorganismos de la acción del desinfectante o de la luz UV.",
				options: [
					{
						text: "Porque la turbidez hace que el agua hierva más rápido.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "Porque las partículas pueden proteger a los gérmenes y disminuir la eficacia de la desinfección.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "Porque la turbidez aumenta el contenido de cloro en el agua.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "Porque la turbidez siempre vuelve el agua salada.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
		{
			title: "Hervido y almacenamiento seguro",
			order: 6,
			duration: 15,
			content: `Módulo complementario sobre las mejores prácticas de almacenamiento después del hervido.`,
			quiz: {
				question:
					"Después de hervir el agua, ¿qué se debe hacer para evitar la recontaminación?",
				explanation:
					"El almacenamiento en recipientes limpios y tapados es clave para conservar el agua segura.",
				options: [
					{
						text: "Dejarla destapada para que se enfríe y cualquiera pueda tomar directamente del recipiente.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "Dejarla enfriar y luego almacenarla en un recipiente limpio, tapado y de boca estrecha.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "Agregarle agua cruda para mejorar el sabor.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "Removerla con utensilios sucios para que se enfríe más rápido.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
		{
			title: "Cloración y turbidez",
			order: 7,
			duration: 15,
			content: `Módulo complementario sobre la importancia de la turbidez en la eficacia de la cloración.`,
			quiz: {
				question: "¿Qué condición del agua mejora la eficacia de la cloración?",
				explanation:
					"Un agua con baja turbidez permite que el cloro actúe mejor sobre los microorganismos.",
				options: [
					{
						text: "Que el agua sea muy turbia y con muchos sedimentos.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "Que el agua tenga baja turbidez gracias a un pretratamiento previo.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "Que el agua esté muy fría y sin mezclar.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "Que el agua tenga un color oscuro para ver mejor el cloro.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
		{
			title: "SODIS - Limitaciones y precauciones",
			order: 8,
			duration: 15,
			content: `Módulo complementario sobre las limitaciones del método SODIS y cómo manejarlas.`,
			quiz: {
				question: "Una limitación importante del método SODIS es que:",
				explanation:
					"SODIS no deja un residual desinfectante, por lo que el agua puede recontaminarse si se manipula mal.",
				options: [
					{
						text: "Siempre deja un fuerte sabor a cloro en el agua.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "No deja un residual desinfectante, por lo que se debe evitar la recontaminación después del tratamiento.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "Solo funciona de noche, sin luz solar.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "Hace que el agua cambie de color a verde.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
	],
};
