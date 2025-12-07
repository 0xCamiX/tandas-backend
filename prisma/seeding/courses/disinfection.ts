import type { SeedCourse } from "../types";

export const disinfectionCourse: SeedCourse = {
	title: "Desinfección del agua en el hogar",
	description:
		"Aprende métodos prácticos de desinfección del agua: hervido, cloración y desinfección solar (SODIS) para hacer el agua segura para beber en tu hogar.",
	imageUrl: "/images/courses/desinfeccion-agua.png",
	category: "DESINFECCIÓN",
	level: "INICIAL",
	status: "ACTIVO",
	modules: [
		{
			title: "Hervido del agua",
			order: 1,
			duration: 40,
			content: `En este módulo aprenderás a desinfectar el agua mediante el hervido, un método tradicional, sencillo y altamente efectivo.

El hervido consiste en llevar el agua a ebullición para destruir los microorganismos causantes de enfermedades. Al hervir el agua correctamente, se logra eliminar bacterias, virus y parásitos de forma confiable.

Pasos para hervir el agua correctamente:

1. Usar recipientes limpios: Emplee una olla o pava limpia para hervir el agua, y otro recipiente limpio para almacenarla después. Esto evita recontaminar el agua tratada.

2. Pre-filtrar si el agua está turbia: Si el agua tiene sedimentos o está turbia, déjela reposar unos minutos y luego vierta suavemente el agua clara en otro recipiente, o pásela por un paño o tela limpia antes de hervir. Este paso remueve partículas que podrían dificultar la desinfección.

3. Hervir vigorosamente: Tape la olla y caliente el agua hasta que alcance estado de ebullición continua (burbujeo intenso). Mantenga el agua hirviendo durante 5 minutos para asegurar la destrucción de los patógenos. En altitudes elevadas o en situaciones de brotes epidémicos, algunas guías sugieren hervir por tiempo adicional como medida de seguridad.

4. Enfriar y conservar adecuadamente: Deje que el agua hervida se enfríe en el mismo recipiente con la tapa puesta, evitando la entrada de polvo o insectos. Una vez fría, trasládela (si es necesario) a un contenedor de almacenamiento limpio, preferiblemente uno con tapa y grifito o llave dispensadora. Esto permite servir el agua sin introducir las manos o utensilios, reduciendo el riesgo de recontaminación.

Cuidados después del hervido:

- No introduzca las manos, cucharas u otros utensilios dentro del agua mientras se enfría.
- Si no tiene un recipiente con grifito, use un cucharón limpio reservado solo para el agua tratada. No introduzca el cucharón dentro del recipiente; vierta el agua desde arriba.
- Guarde el agua en un lugar limpio, elevado y protegido del sol directo.
- Mantenga el recipiente siempre tapado.
- No mezcle agua hervida con agua sin tratar.
- Consuma el agua hervida lo antes posible. Si debe guardarla, asegúrese de que el recipiente esté bien limpio y tapado.

Ventajas del hervido:

- Inactiva prácticamente todos los microorganismos presentes en el agua.
- Es un método conocido y confiable.
- No requiere productos químicos.

Limitaciones:

- Requiere combustible (gas, leña, electricidad).
- Puede cambiar el sabor del agua.
- No elimina contaminantes químicos ni sedimentos.
- Si no se almacena correctamente, el agua puede recontaminarse.

Al finalizar, podrás hervir el agua de manera segura siguiendo los pasos correctos, evitar la recontaminación durante el enfriamiento y almacenamiento, y mantener el agua segura para el consumo de tu familia.`,
			videoUrl: "https://www.youtube.com/watch?v=kik7YAeBcsU",
			resources: [
				{
					type: "PDF",
					url: "resources/desinfeccion/hervido/metodo-hervido.pdf",
					title: "Guía práctica: Método de hervido del agua",
					description:
						"Documento instruccional completo con los pasos detallados para hervir el agua correctamente y almacenarla de forma segura.",
				},
			],
			quizzes: [
				{
					question:
						"¿Cuánto tiempo se debe mantener el agua hirviendo para asegurar que esté desinfectada?",
					explanation:
						"Se recomienda mantener el agua hirviendo durante 5 minutos después de que comience la ebullición vigorosa para asegurar la destrucción de los patógenos.",
					options: [
						{
							text: "Solo unos segundos, hasta que aparezcan las primeras burbujas.",
							isCorrect: false,
							order: 1,
						},
						{
							text: "Durante 5 minutos después de que comience a hervir vigorosamente.",
							isCorrect: true,
							order: 2,
						},
						{
							text: "Media hora para que sea más efectivo.",
							isCorrect: false,
							order: 3,
						},
						{
							text: "No importa el tiempo, solo que hierva un momento.",
							isCorrect: false,
							order: 4,
						},
					],
				},
				{
					question:
						"Después de hervir el agua, ¿qué se debe hacer para evitar la recontaminación?",
					explanation:
						"El agua hervida debe enfriarse tapada y almacenarse en un recipiente limpio con tapa para evitar que se recontamine.",
					options: [
						{
							text: "Dejarla destapada para que se enfríe más rápido y cualquiera pueda tomarla.",
							isCorrect: false,
							order: 1,
						},
						{
							text: "Dejarla enfriar tapada y luego almacenarla en un recipiente limpio con tapa.",
							isCorrect: true,
							order: 2,
						},
						{
							text: "Mezclarla con agua sin hervir para mejorar el sabor.",
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
				{
					question:
						"¿Cuál es una ventaja del método de hervido para desinfectar el agua?",
					explanation:
						"El hervido inactiva prácticamente todos los microorganismos y no requiere productos químicos, siendo un método muy confiable.",
					options: [
						{
							text: "No requiere ningún combustible ni energía.",
							isCorrect: false,
							order: 1,
						},
						{
							text: "Inactiva prácticamente todos los microorganismos y no requiere productos químicos.",
							isCorrect: true,
							order: 2,
						},
						{
							text: "Elimina todos los contaminantes químicos del agua.",
							isCorrect: false,
							order: 3,
						},
						{
							text: "Funciona igual de bien con agua muy turbia sin pretratamiento.",
							isCorrect: false,
							order: 4,
						},
					],
				},
			],
		},
		{
			title: "Cloración domiciliaria",
			order: 2,
			duration: 45,
			content: `En este módulo aprenderás a desinfectar el agua usando cloro, un método ampliamente usado en todo el mundo por su eficacia y bajo costo.

La cloración domiciliaria consiste en agregar al agua un desinfectante químico a base de cloro (como lejía o hipoclorito) en dosis adecuadas, para eliminar los gérmenes y mantener un residual que evite recontaminación durante el almacenamiento.

Pasos para clorar el agua correctamente:

1. Usar agua lo más clara posible: Si el agua cruda está turbia, no se debe clorar directamente. Primero fíltrela o déjela decantar para que quede transparente, ya que la materia suspendida reduce la eficacia del cloro. Nunca agregue cloro a agua visiblemente turbia sin pretratamiento, pues los sólidos pueden impedir que el desinfectante mate todos los microbios.

2. Dosificar la cantidad correcta de cloro: Añada la dosis recomendada de cloro según el volumen de agua. Con lejía doméstica estándar (aproximadamente 5% de cloro activo), se sugiere agregar aproximadamente 1 gota por cada litro de agua. Esta proporción produce un nivel residual de cloro libre suficiente para desinfección segura. Si la concentración de la lejía es distinta, ajuste la dosis siguiendo tablas oficiales o indicaciones del fabricante.

Dosificación del cloro:
- 1 gota por cada litro de agua
- 4 gotas por cada galón de agua
- 20 gotas por cada 5 galones de agua

3. Mezclar bien y esperar el tiempo de contacto: Después de agregar el cloro, mezcle o agite bien el recipiente para que el desinfectante se distribuya homogéneamente. Deje el agua tratada en reposo al menos 30 minutos antes de consumirla. Este tiempo de contacto es necesario para que el cloro elimine bacterias, virus y otros patógenos presentes. No la beba antes de media hora de contacto.

4. Verificar olor residual (opcional): Pasados 30 minutos, el agua debe conservar un ligero olor a cloro. Este olor es indicativo de que queda cloro residual y, por tanto, de que la desinfección fue efectiva. Si no percibe nada de olor, puede agregar una gota más por litro, mezclar y esperar otros 15 minutos adicionales.

5. Conservar el agua clorada en limpio: Almacene el agua ya desinfectada en un recipiente limpio, tapado. El residual de cloro ayudará a mantenerla segura siempre que no se introduzcan contaminantes. Evite volver a trasvasar varias veces; idealmente use un dispensador o cucharón limpio para servirse, minimizando el contacto directo.

¿Por qué es importante la dosis correcta?

- Muy poco cloro: No desinfecta bien y puede dejar microorganismos vivos.
- Demasiado cloro: Puede resultar tóxico o alterar el sabor del agua, haciendo que la gente no quiera beberla.
- Dosis adecuada: Elimina los patógenos sin afectar el sabor de manera desagradable.

Precauciones importantes:

- Guarde el cloro en envases cerrados, lejos del sol y fuera del alcance de niños.
- No mezcle cloro con otros productos químicos domésticos.
- Use solo lejía apta para desinfección de agua, sin perfumes ni aditivos.
- El ligero olor a cloro indica protección, no contaminación. Explique esto a su familia.

Importante: Utilice solo lejía apta para desinfección de agua – por ejemplo, productos etiquetados para purificar agua o lejía común sin perfumes ni aditivos. No emplee blanqueadores industriales o con fragancia para consumo humano.

Al finalizar, podrás calcular y aplicar dosis sencillas de cloro para desinfectar el agua en tu hogar de manera segura, conocer las precauciones necesarias y almacenar el agua clorada correctamente.`,
			videoUrl: "https://www.youtube.com/watch?v=ejemplo-cloracion-agua",
			resources: [
				{
					type: "PDF",
					url: "resources/desinfeccion/cloracion/metodo-cloracion.pdf",
					title: "Guía práctica: Método de cloración del agua",
					description:
						"Documento instruccional completo con los pasos detallados para clorar el agua correctamente, incluyendo tablas de dosificación y precauciones.",
				},
			],
			quizzes: [
				{
					question:
						"¿Cuánto tiempo se debe esperar después de agregar cloro al agua antes de beberla?",
					explanation:
						"Se debe esperar al menos 30 minutos después de agregar el cloro para que tenga tiempo de eliminar los microorganismos.",
					options: [
						{
							text: "Inmediatamente, el cloro funciona al instante.",
							isCorrect: false,
							order: 1,
						},
						{
							text: "Al menos 30 minutos para que el cloro elimine los microorganismos.",
							isCorrect: true,
							order: 2,
						},
						{
							text: "Solo 5 minutos es suficiente.",
							isCorrect: false,
							order: 3,
						},
						{
							text: "No hay que esperar, se puede beber de inmediato.",
							isCorrect: false,
							order: 4,
						},
					],
				},
				{
					question:
						"¿Cuál es la dosis recomendada de lejía doméstica (5% cloro) para desinfectar 1 litro de agua?",
					explanation:
						"La dosis recomendada es 1 gota de lejía doméstica estándar (5% cloro) por cada litro de agua.",
					options: [
						{
							text: "10 gotas por litro para que sea más efectivo.",
							isCorrect: false,
							order: 1,
						},
						{
							text: "1 gota por litro de agua.",
							isCorrect: true,
							order: 2,
						},
						{
							text: "Media taza de lejía por litro.",
							isCorrect: false,
							order: 3,
						},
						{
							text: "No importa la cantidad, cualquier dosis funciona igual.",
							isCorrect: false,
							order: 4,
						},
					],
				},
				{
					question:
						"¿Qué condición del agua mejora la eficacia de la cloración?",
					explanation:
						"Un agua con baja turbidez permite que el cloro actúe mejor sobre los microorganismos. Si el agua está turbia, primero debe filtrarse o decantarse.",
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
			],
		},
		{
			title: "Desinfección solar (SODIS)",
			order: 3,
			duration: 50,
			content: `En este módulo aprenderás a desinfectar el agua usando la energía del sol mediante el método SODIS (Desinfección Solar), una técnica de bajo costo y fácil aplicación ideal para zonas de clima soleado.

El método SODIS consiste en llenar envases transparentes con agua y exponerlos a la luz solar directa durante varias horas. La radiación UV del sol, junto con el aumento de temperatura dentro de la botella, destruyen los organismos patógenos. Estudios han demostrado que SODIS puede eliminar hasta 99.9% de los microorganismos cuando se aplica correctamente.

Pasos para aplicar SODIS:

1. Utilizar botellas plásticas transparentes apropiadas: Tome botellas de plástico transparentes (preferentemente de tereftalato de polietileno PET, como las de refrescos) de hasta 2-3 litros de capacidad. Lave muy bien las botellas y sus tapas antes de usarlas, asegurándose de que no queden residuos. No se recomienda usar botellas de vidrio o de mayor tamaño, ya que el plástico PET permite mejor paso de la radiación UV y volúmenes grandes dificultan un calentamiento uniforme.

2. Llenar con agua clara: Rellene las botellas con el agua a desinfectar, preferiblemente agua previamente filtrada o decantada para que esté lo más clara posible. El método SODIS solo funciona bien con aguas de baja turbidez; si el agua está turbia (más de aproximadamente 30 NTU de turbidez), es indispensable filtrarla o dejar que los sedimentos se asienten antes de su exposición solar. Deje un pequeño espacio de aire al tope de la botella (unos centímetros) y cierre la tapa. Ese aire ayuda a que, al agitar ligeramente la botella, el oxígeno disuelto contribuya a la acción desinfectante.

3. Exponer las botellas al sol: Coloque las botellas llenas en posición horizontal bajo la luz solar directa, en un lugar donde reciban sol intenso durante varias horas seguidas. Se suelen poner sobre el techo de chapa/calamina, sobre una lámina de metal corrugado, o simplemente en el patio expuestas al cielo abierto. Una superficie metálica o reflectante debajo de las botellas ayuda a incrementar la irradiación y la temperatura, mejorando la eficacia del proceso. Asegúrese de que no haya sombras sobre las botellas durante el periodo de exposición.

4. Tiempo de exposición requerido: Deje las botellas al sol por al menos 6 horas continuas en un día soleado. Si las coloca por la mañana, puede retirarlas al final de la tarde (mínimo seis horas de sol fuerte). En días parcialmente nublados, cuando el sol está débil o hasta un 50% cubierto, se recomienda prolongar la exposición a unos 2 días completos. En días lluviosos o muy oscurecidos, SODIS no alcanza temperaturas/UV suficientes y no debe usarse hasta que mejoren las condiciones solares.

5. Consumo y almacenamiento pos-tratamiento: Transcurrido el tiempo de exposición, el agua ya está desinfectada y lista para beber. Lo ideal es consumirla directamente de la misma botella o trasladarla a un recipiente limpio inmediatamente. Se aconseja no trasvasar repetidamente el agua tratada ni almacenarla en envases sucios, para evitar recontaminación. Si se va a guardar para más tarde, tape bien la botella o el recipiente de almacenamiento. Las botellas plásticas usadas deben lavarse nuevamente antes de cada reutilización.

¿Cómo funciona SODIS?

Este proceso aprovecha dos efectos del sol:
- La radiación ultravioleta (UV-A), que daña el ADN de bacterias, virus y parásitos, impidiendo que se reproduzcan.
- El calentamiento del agua dentro de la botella, que actúa como una pasteurización solar (las botellas alcanzan temperaturas de 50-60°C en un día soleado).

La combinación de luz UV más calor produce una inactivación eficiente de los microbios.

Condiciones necesarias para SODIS:

1. Agua clara: El agua debe estar lo más clara posible. Si está turbia, primero debe filtrarse o dejarse decantar. El método SODIS solo funciona bien con aguas de baja turbidez (menos de aproximadamente 30 NTU).

2. Botellas apropiadas: Use botellas de plástico transparente PET (como las de refrescos) de hasta 2-3 litros. Lávelas bien antes de cada uso. No use botellas de vidrio o muy grandes.

3. Sol directo: Las botellas deben recibir sol directo e intenso. Colóquelas en posición horizontal sobre una superficie que reciba mucho sol, como techos de chapa, láminas de metal o patios abiertos. Evite lugares con sombra.

4. Tiempo de exposición según el clima:
   - Día soleado: Mínimo 6 horas continuas.
   - Día parcialmente nublado (hasta 50% nubes): 2 días completos.
   - Día lluvioso o muy nublado: No usar SODIS hasta que mejore el clima.

Cuidados importantes:

- Lave bien las botellas y tapas antes de cada uso.
- Deje un pequeño espacio de aire en la parte superior de la botella.
- No introduzca las manos o utensilios dentro del agua después del tratamiento.
- Consuma el agua lo antes posible después del tratamiento, o guárdela en un recipiente limpio y tapado.
- No trasvase el agua varias veces, esto aumenta el riesgo de recontaminación.

¿Cuándo NO usar SODIS?

- Cuando el agua está muy turbia y no se puede pretratar.
- En días lluviosos o muy nublados.
- Cuando no hay suficiente sol directo disponible.
- Si necesita desinfectar grandes volúmenes de agua rápidamente.

Ventajas de SODIS:

- Bajo costo (solo necesita botellas plásticas).
- No requiere combustible ni productos químicos.
- Fácil de implementar en zonas rurales con buen sol.
- Efectivo cuando se aplica correctamente.

Limitaciones:

- Depende del clima y la disponibilidad de sol.
- No deja residual desinfectante (el agua puede recontaminarse si no se maneja bien).
- Solo funciona con agua clara.
- No elimina contaminantes químicos (no mejora parámetros químicos del agua; su función es exclusivamente microbiológica).

Al finalizar, podrás implementar el método SODIS correctamente en tu hogar, saber cuándo es apropiado usarlo, qué condiciones se necesitan y cómo cuidar el agua después del tratamiento.`,
			videoUrl: "https://www.youtube.com/watch?v=ejemplo-sodis-agua",
			resources: [
				{
					type: "PDF",
					url: "resources/desinfeccion/sodis/metodo-sodis.pdf",
					title: "Guía práctica: Método SODIS de desinfección solar",
					description:
						"Documento instruccional completo con los pasos detallados para aplicar el método SODIS correctamente, incluyendo condiciones necesarias y cuidados.",
				},
			],
			quizzes: [
				{
					question:
						"¿Cuánto tiempo mínimo deben estar las botellas al sol en un día soleado para que SODIS funcione?",
					explanation:
						"En un día soleado, las botellas deben estar expuestas al sol directo por al menos 6 horas continuas para que el método SODIS sea efectivo.",
					options: [
						{
							text: "Solo 30 minutos es suficiente.",
							isCorrect: false,
							order: 1,
						},
						{
							text: "Al menos 6 horas continuas de sol directo.",
							isCorrect: true,
							order: 2,
						},
						{
							text: "2 horas es suficiente en cualquier condición.",
							isCorrect: false,
							order: 3,
						},
						{
							text: "Solo 10 minutos al sol.",
							isCorrect: false,
							order: 4,
						},
					],
				},
				{
					question:
						"¿Qué condición es NECESARIA para que el método SODIS funcione correctamente?",
					explanation:
						"Para que SODIS funcione, se necesita agua clara, botellas transparentes y al menos 6 horas de sol directo en un día soleado.",
					options: [
						{
							text: "Usar agua muy turbia sin ningún pretratamiento.",
							isCorrect: false,
							order: 1,
						},
						{
							text: "Usar botellas transparentes con agua clara y exponerlas al menos 6 horas al sol directo.",
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
				{
					question: "Una limitación importante del método SODIS es que:",
					explanation:
						"SODIS no deja un residual desinfectante, por lo que el agua puede recontaminarse si se manipula mal después del tratamiento.",
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
			],
		},
	],
};

