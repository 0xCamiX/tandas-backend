import type { SeedCourse } from "../../types";

export const filtrationCourse: SeedCourse = {
	title: "Filtración del agua en el hogar",
	description:
		"Aprende a usar distintos métodos de filtración —desde paños y filtros de bioarena hasta filtros cerámicos— para reducir la turbidez y parte de los microorganismos del agua en casa.",
	imageUrl: "/images/courses/filtracion-agua.jpg",
	category: "FILTRACIÓN",
	level: "BEGINNER",
	status: "ACTIVE",
	modules: [
		{
			title: "¿Qué es la filtración y qué puede lograr?",
			order: 1,
			duration: 20,
			content: `En este módulo conocerás la filtración como método de pretratamiento del agua a nivel domiciliario.

La filtración consiste en hacer pasar el agua a través de un medio poroso (tela, arena, cerámica, membrana) que retiene partículas y algunos microorganismos. Dependiendo del tipo de filtro, puede eliminar:

- Impurezas visibles (hojas, insectos, arena gruesa).

- Parte de la turbidez del agua.

- Bacterias y protozoos (en el caso de filtros de bioarena, cerámicos o de membrana).

Aprenderás que:

- La filtración reduce la cantidad de microbios, pero no siempre inactiva virus.

- En muchos casos, se debe combinar con un método de desinfección (cloro, hervido, SODIS).

- Un buen mantenimiento del filtro (limpieza, recambio de elementos) es clave para que funcione bien.

Al final del módulo tendrás una visión general de los distintos tipos de filtración que se explicarán con más detalle en los módulos siguientes.`,
			resources: [
				{
					type: "PDF",
					url: "resources/cawst-tratamiento-domiciliario.pdf",
					title:
						"Tratamiento del agua a nivel domiciliario - Sección Filtración",
					description:
						"Explicación general de la filtración y sus diferentes tipos (tela, bioarena, cerámica, membranas).",
				},
				{
					type: "OTHER",
					url: "assets/infografia-tipos-filtracion.png",
					title: "Infografía: Tipos de filtros para el hogar",
					description:
						"Resumen visual de los filtros más comunes y su nivel de protección.",
				},
			],
			quiz: {
				question:
					"¿Cuál de las siguientes afirmaciones describe mejor la filtración del agua?",
				explanation:
					"La filtración hace pasar el agua a través de un medio poroso que retiene partículas y algunos microorganismos.",
				options: [
					{
						text: "Es el proceso de hervir el agua hasta que se evapore.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "Es hacer pasar el agua por un medio poroso para retener partículas y algunos microorganismos.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "Es el almacenamiento del agua en recipientes tapados.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "Es agregar cloro al agua para matar gérmenes.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
		{
			title: "Filtración básica con tela o paño",
			order: 2,
			duration: 20,
			content: `En este módulo verás la forma más sencilla de filtrar agua: usar una tela o paño limpio.

Este tipo de filtración ayuda a:

- Retener hojas, insectos y partículas grandes.

- Reducir ligeramente la turbidez.

- Disminuir, en forma limitada, la presencia de ciertos organismos que viajan adheridos a partículas grandes.

Pasos generales:

1. Escoger una tela limpia (por ejemplo, algodón o gasa de trama cerrada).

2. Colocar la tela sobre la boca del recipiente donde se recogerá el agua.

3. Verter el agua cruda lentamente a través de la tela.

4. Lavar y secar la tela con frecuencia para evitar acumulación de suciedad.

También se explicará que:

- Esta técnica NO es suficiente para garantizar que el agua sea segura.

- Debe ser vista como un primer paso, antes de la desinfección (hervido, cloro o SODIS).

- La tela debe mantenerse limpia y guardarse en un lugar donde no se contamine.

Al final del módulo podrás demostrar cómo usar la filtración con tela y explicar sus limitaciones.`,
			videoUrl: "videos/filtracion/filtracion-con-tela.mp4",
			resources: [
				{
					type: "VIDEO",
					url: "videos/filtracion/filtracion-con-tela.mp4",
					title: "Video: Filtración básica con tela",
					description:
						"Demostración práctica de cómo filtrar agua a través de un paño limpio.",
				},
				{
					type: "DOC",
					url: "resources/guia-filtracion-tela.docx",
					title: "Guía práctica: Filtración con tela en el hogar",
					description: "Instrucciones impresas para actividades comunitarias.",
				},
			],
			quiz: {
				question:
					"¿Cuál es el principal beneficio de filtrar el agua con tela o paño?",
				explanation:
					"La tela ayuda a retener partículas grandes y algunas impurezas visibles, pero no hace que el agua sea completamente segura.",
				options: [
					{
						text: "Eliminar todos los virus presentes en el agua.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "Retener partículas grandes como hojas, insectos y parte de la suciedad visible.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "Convertir el agua en agua mineral.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "Cambiar el sabor del agua para que sea dulce.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
		{
			title: "Filtro de bioarena: funcionamiento y uso correcto",
			order: 3,
			duration: 30,
			content: `En este módulo aprenderás cómo funciona un filtro de bioarena, una de las tecnologías más difundidas para el tratamiento de agua en el hogar.

El filtro de bioarena está compuesto por:

- Un recipiente (normalmente de concreto o plástico resistente).

- Capas de grava gruesa y fina.

- Una capa de arena fina donde se forma, en la parte superior, una capa biológica (schmutzdecke) que ayuda a retener y digerir microorganismos.

Puntos clave:

- El agua se vierte en la parte superior y atraviesa lentamente la arena.

- La capa biológica y la arena atrapan y reducen bacterias, protozoos y otros patógenos.

- El filtro funciona mejor cuando se usa de manera regular y se mantiene húmedo.

Buenas prácticas:

- No remover ni mezclar la capa superior de arena.

- Limpiar solo la superficie cuando el flujo disminuye (por ejemplo, retirando una pequeña capa de arena sucia).

- Usar siempre agua pretratada si es muy turbia (puede requerir sedimentación previa).

- Recoger el agua filtrada en un recipiente limpio y tapado, y combinarla con desinfección si se requiere mayor seguridad.

Al final del módulo, podrás describir la estructura básica de un filtro de bioarena y las reglas esenciales para su operación y mantenimiento.`,
			resources: [
				{
					type: "PDF",
					url: "resources/manual-filtro-bioarena.pdf",
					title: "Manual comunitario: Filtro de bioarena",
					description:
						"Guía paso a paso para construir, usar y mantener un filtro de bioarena.",
				},
				{
					type: "OTHER",
					url: "assets/esquema-filtro-bioarena.png",
					title: "Esquema del filtro de bioarena",
					description:
						"Diagrama de cortes que muestra las capas de grava, arena y la capa biológica.",
				},
			],
			quiz: {
				question:
					"¿Qué función cumple la capa biológica (schmutzdecke) en un filtro de bioarena?",
				explanation:
					"La capa biológica ayuda a retener y degradar microorganismos presentes en el agua.",
				options: [
					{
						text: "Dar color al agua para ver si está limpia.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "Retener y ayudar a eliminar microorganismos que causan enfermedades.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "Aumentar la temperatura del agua.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "Agregar minerales al agua para mejorar el sabor.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
		{
			title: "Filtros cerámicos y de membrana: cuidados y limitaciones",
			order: 4,
			duration: 30,
			content: `En este módulo conocerás otros tipos de filtros utilizados a nivel domiciliario: filtros cerámicos y filtros de membrana.

Filtros cerámicos:

- Tienen pequeños poros en la cerámica que bloquean bacterias y protozoos.

- A veces están impregnados con plata coloidal para añadir efecto antimicrobiano.

- Se presentan en forma de velas, discos o vasijas filtrantes.

Filtros de membrana (microfiltración, ultrafiltración):

- Utilizan membranas sintéticas con poros muy finos que retienen microorganismos más pequeños.

- Pueden ofrecer una mayor reducción de bacterias y virus, pero suelen requerir presión, mantenimiento y costos más altos.

Puntos clave para ambos:

- Es fundamental seguir las instrucciones del fabricante.

- Limpiar los elementos filtrantes con mucho cuidado para no romperlos ni agrandar los poros.

- No usar sustancias abrasivas que dañen la cerámica o la membrana.

- Combinar, cuando sea necesario, con desinfección (especialmente si hay riesgo de virus).

Al finalizar, sabrás explicar qué ofrecen estos filtros, qué cuidados requieren y por qué siguen siendo parte del enfoque de barreras múltiples junto a la desinfección y el almacenamiento seguro.`,
			resources: [
				{
					type: "PDF",
					url: "resources/filtros-ceramicos-membrana-guia.pdf",
					title: "Guía: Uso de filtros cerámicos y de membrana",
					description:
						"Recomendaciones para el uso seguro de filtros cerámicos y de membrana a nivel domiciliario.",
				},
				{
					type: "OTHER",
					url: "assets/comparativo-filtros-ceramicos-membranas.png",
					title: "Cuadro comparativo de filtros cerámicos y de membrana",
					description:
						"Ventajas, desventajas y requisitos de cuidado para cada tipo de filtro.",
				},
			],
			quiz: {
				question:
					"¿Qué característica hace que los filtros cerámicos retengan bacterias y protozoos?",
				explanation:
					"Los poros pequeños de la cerámica actúan como barrera física contra microorganismos de cierto tamaño.",
				options: [
					{
						text: "El color de la cerámica.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "Los poros pequeños que actúan como barrera física.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "El sabor que agrega al agua.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "El peso del filtro.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
		{
			title: "Filtros cerámicos y de membrana - Parte 2",
			order: 5,
			duration: 15,
			content: `Continuación del módulo anterior sobre filtros cerámicos y de membrana, enfocándonos en las mejores prácticas de mantenimiento.`,
			quiz: {
				question:
					"¿Qué es importante tener en cuenta al limpiar un filtro cerámico o de membrana?",
				explanation:
					"Limpiar con cuidado para no dañar los poros ni la superficie filtrante, evitando sustancias abrasivas.",
				options: [
					{
						text: "Usar cepillos metálicos y arena para raspar los poros.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "Limpiar con suavidad, siguiendo las recomendaciones del fabricante, para no dañar los poros.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "Golpear el filtro contra superficies duras para sacar la suciedad.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "No hace falta limpiarlos; se autolimpian con el paso del agua.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
		{
			title: "Filtración y desinfección - Combinación de métodos",
			order: 6,
			duration: 15,
			content: `Módulo complementario sobre la importancia de combinar la filtración con métodos de desinfección.`,
			quiz: {
				question: "¿Por qué la filtración suele combinarse con desinfección?",
				explanation:
					"Porque la filtración, por sí sola, no siempre inactiva virus y otros patógenos; la desinfección complementa la protección.",
				options: [
					{
						text: "Porque a la gente no le gusta el sabor del agua filtrada.",
						isCorrect: false,
						order: 1,
					},
					{
						text: "Porque la filtración no elimina todos los microorganismos y necesita un método adicional para inactivarlos.",
						isCorrect: true,
						order: 2,
					},
					{
						text: "Porque la desinfección es más rápida que la filtración.",
						isCorrect: false,
						order: 3,
					},
					{
						text: "Porque sin desinfección el agua cambia de color.",
						isCorrect: false,
						order: 4,
					},
				],
			},
		},
	],
};
