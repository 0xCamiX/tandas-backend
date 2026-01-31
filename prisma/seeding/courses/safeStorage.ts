import type { SeedCourse } from "../types";

export const safeStorageCourse: SeedCourse = {
	title: "Almacenamiento seguro del agua en el hogar",
	description:
		"Aprende a almacenar y manejar el agua tratada en recipientes adecuados para evitar la recontaminación y mantenerla segura para el consumo en tu hogar.",
	imageUrl: "/images/courses/almacenamiento-seguro.png",
	category: "ALMACENAMIENTO SEGURO",
	level: "INICIAL",
	status: "ACTIVO",
	modules: [
		{
			title: "Riesgo de recontaminación y principios de almacenamiento seguro",
			order: 1,
			duration: 30,
			content: `En este módulo conocerás el concepto de recontaminación y por qué el almacenamiento seguro es una barrera clave dentro del enfoque YAKU.

Aunque el agua haya sido tratada (por ejemplo, hervida, clorada o desinfectada con SODIS), puede volver a contaminarse si se manipula de forma inadecuada. La recontaminación puede ocurrir cuando:

- Se usan recipientes sucios o en mal estado.
- Se introducen manos o utensilios contaminados dentro del recipiente.
- El agua tratada se mezcla con agua cruda o sin tratar.
- El recipiente se deja destapado o expuesto a polvo, insectos o animales.
- El agua se almacena en lugares inadecuados o cerca de fuentes de contaminación.

Estudios recientes muestran que cuando el agua no se trata ni se almacena adecuadamente, aparecen numerosas enfermedades gastrointestinales, urinarias y dermatológicas asociadas al consumo de agua no segura. Por ello, los principios de un almacenamiento seguro se centran en prevenir la recontaminación.

Principios básicos del almacenamiento seguro:

1. Separar claramente el agua cruda del agua tratada: Nunca mezclar agua tratada con agua sin tratar. Use recipientes diferentes y claramente identificados para cada tipo de agua.

2. Usar recipientes limpios, con tapa y preferiblemente de boca estrecha o con grifo: Los recipientes deben estar en buen estado, sin grietas ni corrosión, y deben tener tapas ajustadas que impidan la entrada de contaminantes.

3. Manipular el agua tratada con utensilios limpios: Reserve cucharones, jarras o vasos exclusivamente para el agua tratada. Estos utensilios no deben tocar el interior del recipiente ni el agua restante. Lávelos regularmente y manténgalos protegidos cuando no se usen.

4. Ubicar los recipientes en un lugar elevado, fresco y protegido: Coloque el contenedor en un lugar limpio, lejos del alcance de niños, mascotas y de posibles fuentes de suciedad o residuos. Manténgalo fuera de la luz solar directa para evitar el crecimiento de algas.

5. Mantener el recipiente siempre tapado: Cada vez que se haya extraído agua, el envase debe cerrarse de inmediato con su tapa. Esto evita la entrada de polvo, insectos o contacto accidental.

6. Limpieza regular del contenedor: Lave el recipiente periódicamente con agua y jabón, enjuáguelo bien y desinféctelo con una solución de cloro (lejía) para eliminar patógenos. Esta rutina debe repetirse al menos semanalmente o cuando se note suciedad.

7. Higiene personal al manipular agua: Lávese bien las manos con agua y jabón antes de tomar agua del recipiente o de transferirla a otro envase. Evite apoyar la boca directamente en recipientes grandes; es preferible verter el agua en un vaso limpio para beber.

Importancia del almacenamiento seguro:

Un buen almacenamiento, por sí solo, contribuye significativamente a reducir enfermedades diarreicas al mantener la potabilidad del agua hasta el punto de uso. Almacenar agua de forma segura es tan esencial como potabilizarla, pues garantiza que el agua se mantenga apta para el consumo desde el momento del tratamiento hasta su uso final en el hogar.

Al finalizar el módulo podrás explicar qué es la recontaminación, por qué el almacenamiento seguro es tan importante como el tratamiento mismo, y aplicar los principios básicos para mantener el agua tratada libre de contaminación.`,
			videoUrl: "https://www.youtube.com/watch?v=zdnwEbF2_Ts",
			resources: [
				{
					type: "PDF",
					url: "resources/almacenamiento/recontaminacion/principios-almacenamiento-seguro.pdf",
					title: "Guía básica: Principios de almacenamiento seguro del agua",
					description:
						"Documento introductorio sobre recontaminación y principios de manejo del agua tratada.",
				},
			],
			quizzes: [
				{
					question: "¿Qué es la recontaminación del agua tratada?",
					explanation:
						"La recontaminación ocurre cuando el agua que ya fue tratada se vuelve a contaminar por un manejo inseguro, contacto con recipientes sucios o utensilios contaminados.",
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
				{
					question:
						"¿Cuál de las siguientes acciones AUMENTA el riesgo de recontaminación?",
					explanation:
						"Introducir manos o vasos directamente en el recipiente facilita la llegada de microbios al agua almacenada.",
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
				{
					question:
						"¿Por qué es importante el almacenamiento seguro del agua tratada?",
					explanation:
						"El almacenamiento seguro es tan esencial como potabilizar el agua, porque garantiza que el agua se mantenga apta para el consumo desde el tratamiento hasta su uso final.",
					options: [
						{
							text: "Porque hace que el agua sepa mejor.",
							isCorrect: false,
							order: 1,
						},
						{
							text: "Porque garantiza que el agua tratada se mantenga apta para el consumo hasta su uso final, evitando enfermedades.",
							isCorrect: true,
							order: 2,
						},
						{
							text: "Porque es más barato que tratar el agua.",
							isCorrect: false,
							order: 3,
						},
						{
							text: "Porque no requiere ningún esfuerzo adicional.",
							isCorrect: false,
							order: 4,
						},
					],
				},
			],
		},
		{
			title: "Elección y diseño de recipientes seguros",
			order: 2,
			duration: 35,
			content: `En este módulo aprenderás a identificar qué características debe tener un buen recipiente para almacenar agua tratada en el hogar.

La selección del recipiente adecuado es clave para evitar la contaminación posterior del agua tratada. Se recomiendan contenedores de materiales inocuos y resistentes (por ejemplo, plástico de calidad alimentaria, cerámica o metal esmaltado) con tapas ajustadas que impidan la entrada de suciedad, insectos u otros contaminantes.

Características recomendadas de un recipiente seguro:

1. Tapa ajustada y hermética: La tapa debe cerrar bien y permanecer cerrada cuando no se usa. Esto evita la entrada de polvo, insectos y otros contaminantes externos. Una tapa con abertura pequeña para verter minimiza la exposición del agua al ambiente.

2. Boca ancha con cierre seguro o grifo/vertedora estrecha: 
   - Si tiene boca ancha: Facilita la limpieza interna del recipiente antes de su uso, pero debe contar con tapa hermética para proteger el agua. La abertura amplia permite fregar el interior con cepillo o acceder con la mano para limpieza.
   - Si tiene grifo o llave: Lo ideal es que el recipiente tenga un grifo o llave para extraer el agua sin necesidad de introducir cucharones o vasos en su interior. Esto reduce el contacto y previene la contaminación. Si no tiene grifo, se debe extraer el agua con un cucharón o taza exclusiva y limpia, desinfectada regularmente, nunca con las manos directamente.

3. Material adecuado y en buen estado: Debe ser de material resistente, no tóxico (plástico de calidad alimentaria, cerámica o metal esmaltado), y encontrarse en buen estado (sin grietas ni corrosión). Recipientes deteriorados pueden albergar microbios en sus grietas. Se recomienda no reutilizar envases que hayan contenido químicos o sustancias peligrosas (por ejemplo, envases de pesticidas, combustibles o productos de limpieza).

4. Capacidad apropiada: Se sugieren recipientes de 10 a 20 litros por familia para almacenamiento, de modo que sean manejables en peso y volumétricamente suficientes. Un tamaño moderado facilita su transporte, limpieza y uso cotidiano sin que el agua quede estancada por largos periodos.

5. Diseño fácil de limpiar: Superficies lisas en el interior y boca suficientemente amplia. Antes del primer uso y periódicamente, el recipiente debe lavarse con agua y detergente, enjuagarse bien, y desinfectarse con una solución de cloro (lejía) para eliminar patógenos. Esta rutina de limpieza profunda debe repetirse al menos semanalmente o cuando se note suciedad en las paredes.

Buenas prácticas adicionales:

- Diferenciar visualmente los recipientes para agua cruda y agua tratada (por ejemplo, con etiquetas o colores diferentes).
- Usar recipientes de tamaño adecuado según el consumo familiar, para asegurar rotación del agua y evitar almacenamiento prolongado innecesario.
- Verificar regularmente que los recipientes se encuentren en buen estado (sin grietas, con tapas en buen funcionamiento).

Recipientes NO recomendados:

- Baldes abiertos sin tapa.
- Contenedores improvisados o en mal estado.
- Envases que hayan contenido químicos, pesticidas o combustibles.
- Recipientes con grietas profundas o corrosión.
- Contenedores muy grandes que dificulten la limpieza y el manejo.

En resumen, un recipiente seguro es hermético, robusto, limpio y práctico. Por el contrario, el uso de baldes abiertos o contenedores improvisados incrementa el riesgo de contaminación.

Al finalizar, serás capaz de evaluar si un recipiente es adecuado para almacenar agua tratada y proponer mejoras sencillas de diseño y señalización.`,
			videoUrl: "https://www.youtube.com/watch?v=eXTNGW7s1xY",
			resources: [
				{
					type: "PDF",
					url: "resources/almacenamiento/recipientes/guia-recipientes-seguros.pdf",
					title:
						"Guía práctica: Elección de recipientes seguros para agua tratada",
					description:
						"Documento completo con características, materiales y buenas prácticas para seleccionar recipientes adecuados.",
				},
			],
			quizzes: [
				{
					question:
						"¿Cuál de las siguientes es una característica deseable en un recipiente para agua tratada?",
					explanation:
						"Una tapa ajustada ayuda a proteger el agua de contaminantes externos como polvo, insectos y otros agentes.",
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
				{
					question:
						"¿Cuál es una buena práctica respecto al uso de recipientes para agua cruda y tratada?",
					explanation:
						"Diferenciar recipientes ayuda a evitar confusiones y mezclar agua cruda con agua tratada, lo cual puede causar recontaminación.",
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
				{
					question:
						"¿Qué tipo de recipiente es el MÁS recomendado para almacenar agua tratada?",
					explanation:
						"Un recipiente con grifo o llave permite extraer el agua sin introducir utensilios o manos, reduciendo significativamente el riesgo de recontaminación.",
					options: [
						{
							text: "Un balde abierto sin tapa para que sea fácil de usar.",
							isCorrect: false,
							order: 1,
						},
						{
							text: "Un recipiente con grifo o llave, tapa ajustada y material de calidad alimentaria.",
							isCorrect: true,
							order: 2,
						},
						{
							text: "Un envase que antes contenía productos químicos, bien lavado.",
							isCorrect: false,
							order: 3,
						},
						{
							text: "Cualquier recipiente grande, sin importar su estado.",
							isCorrect: false,
							order: 4,
						},
					],
				},
			],
		},
		{
			title: "Manejo higiénico y organización familiar/comunitaria",
			order: 3,
			duration: 40,
			content: `En este módulo aprenderás prácticas concretas para manipular el agua tratada de forma higiénica en el punto de uso, y cómo organizar a la familia y comunidad para garantizar un almacenamiento seguro sostenido.

Manejo higiénico del agua tratada en el hogar:

Además del recipiente en sí, la forma en que se manipula el agua almacenada determina en gran medida si permanece segura. Varios hábitos higiénicos fundamentales deben incorporarse en el hogar:

1. Ubicación y protección del recipiente: Colóquese el contenedor en un lugar limpio, fresco y elevado, lejos del alcance de niños, mascotas y de posibles fuentes de suciedad o residuos. Mantenerlo fuera de la luz solar directa también evita crecimiento de algas.

2. Extracción del agua sin contaminarla: Nunca introducir las manos u objetos sucios dentro del agua almacenada. Si el recipiente tiene grifo, siempre usarlo. Si no, usar un cucharón o jarra limpia para sacar el agua, guardando este utensilio protegido cuando no se use. Es importante destinar vasos o tazas únicamente para servir el agua, lavándolos después de cada uso.

3. Mantener el recipiente siempre tapado: Cada vez que se haya extraído agua, el envase debe cerrarse de inmediato con su tapa. Esto evita la entrada de polvo, insectos o contacto accidental.

4. Separar el agua tratada de otras aguas: No sumergir en el agua potable elementos que hayan estado en contacto con agua sin tratar u objetos contaminados. Idealmente, mantener el agua de beber en un recipiente dedicado exclusivamente a ese fin, distinto del que se usa para otras tareas (lavar, cocina, etc.).

5. Higiene personal al manipular agua: Lavarse bien las manos con agua y jabón antes de tomar agua del recipiente o de transferirla a otro envase. También, evitar apoyar la boca directamente en recipientes grandes; es preferible verter el agua en un vaso limpio para beber.

6. Limpieza regular del contenedor: Además de la desinfección periódica, en el uso diario conviene enjuagar y fregar el recipiente con frecuencia. Las guías aconsejan lavarlo al menos una vez por semana con agua y cloro o jabón, para remover biopelículas o sedimentos acumulados. Esto se debe intensificar si se nota alguna suciedad visible, mal olor o si el agua almacenada empieza a presentar cambios. Siempre desechar el agua remanente si ha estado muchos días estancada y limpiar el envase antes de rellenarlo con agua nueva.

Organización familiar para el almacenamiento seguro:

Lograr un almacenamiento seguro sostenido en el tiempo requiere no solo acciones individuales, sino también una organización a nivel familiar. En el hogar, es recomendable:

1. Asignar responsabilidades: Definir quién se encarga de rellenar el recipiente y cuándo, quién lo limpia semanalmente, y enseñar a los niños a no tocar el agua con las manos ni jugar cerca del depósito.

2. Educación en la familia: Toda la familia debe entender por qué se siguen estas medidas, relacionándolas con la prevención de enfermedades. La capacitación en casa (charlas de promotores de salud, materiales didácticos sencillos, etc.) es fundamental para corregir malos hábitos y afianzar costumbres seguras.

3. Establecer horarios y rutinas: Definir horarios para tratar y almacenar el agua (por ejemplo, en la noche después de hervir o clorar). Colocar recordatorios visuales (afiches, etiquetas) cerca de los recipientes.

4. Monitoreo y verificación: Verificar periódicamente que los recipientes se encuentren en buen estado (sin grietas, con tapas en buen funcionamiento). Monitorear sencillo de cloro residual cuando se use cloración.

Organización comunitaria:

En muchas zonas rurales y barrios urbanos, el suministro de agua es colectivo o intermitente, y las soluciones deben ser comunitarias:

1. Acuerdos comunitarios y apoyo mutuo: Es útil conformar comités de agua u organizaciones vecinales que velen por la calidad del agua almacenada comunitariamente (por ejemplo, en tanques o cisternas comunes) y que difundan buenas prácticas. Estos comités pueden coordinar la limpieza periódica de tanques comunales, gestionar cloración del agua distribuida y promover campañas de higiene.

2. Recursos y apoyo institucional: La organización comunitaria también implica exigir y facilitar recursos. Muchas familias no cuentan con recipientes apropiados o insumos (como cloro) para asegurar el agua almacenada. Una comunidad organizada puede gestionar ayuda de autoridades o ONGs para la dotación de tanques seguros, filtros domiciliarios, capacitaciones y seguimiento.

3. Integración en estructuras comunitarias: Integrar este tema en las estructuras comunitarias (comités de salud, escuelas, iglesias locales) contribuye a que el mensaje llegue a todos los hogares y se mantenga en el tiempo.

En síntesis, el almacenamiento seguro del agua es una tarea compartida. Se requiere del compromiso familiar en cada vivienda y de la organización comunitaria que refuerce y complemente esas prácticas. Uniendo esfuerzos –familias informadas y organizadas, comunidades apoyadas por políticas de salud pública– es posible garantizar que tanto en entornos rurales como urbanos el agua tratada se mantenga segura hasta el último vaso que bebe cada persona.

Al finalizar el módulo, podrás diseñar rutinas sencillas de manejo higiénico del agua tratada para tu hogar o para una comunidad, y diseñar un pequeño plan de acción para que las prácticas de almacenamiento seguro no dependan solo de una persona, sino que se mantengan en el tiempo a nivel familiar y comunitario.`,
			videoUrl: "https://www.youtube.com/watch?v=OFkoO9Du9ms",
			resources: [
				{
					type: "PDF",
					url: "resources/almacenamiento/manejo-higienico/guia-manejo-organizacion.pdf",
					title:
						"Guía completa: Manejo higiénico y organización familiar/comunitaria",
					description:
						"Documento con prácticas de manejo higiénico, rutinas familiares y estrategias de organización comunitaria.",
				},
			],
			quizzes: [
				{
					question:
						"¿Cuál de las siguientes prácticas ayuda a mantener el agua tratada libre de recontaminación?",
					explanation:
						"Usar utensilios limpios y verter el agua sin introducir vasos en el recipiente protege el agua restante de contaminación.",
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
				{
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
				{
					question:
						"¿Qué estrategia ayuda a que las prácticas de almacenamiento seguro se mantengan en el tiempo?",
					explanation:
						"Asignar responsabilidades y usar recordatorios visuales favorece la continuidad de las buenas prácticas en el hogar y la comunidad.",
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
			],
		},
	],
};
