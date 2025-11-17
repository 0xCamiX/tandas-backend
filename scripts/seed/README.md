# Seed scripts overview

Este módulo define una estrategia controlada para poblar la base de datos con los cursos, módulos, recursos y quizzes oficiales de TANDAS. Se compone de tres bloques:

1. **Definición de datos** (`data/courses/*.ts`): cada archivo describe un curso completo, manteniendo responsables claros por temática.
2. **Tipado común** (`types.ts`): asegura que todas las definiciones respeten el esquema Prisma (`CourseLevel`, `ResourceType`, etc.).
3. **Ejecución** (`index.ts`): orquesta la sincronización contra la base de datos, limpiando la jerarquía (resources → quizzes → modules) antes de recrearla.

## Distribución de responsabilidades

| Curso                               | Archivo                                        | Responsable sugerido |
|------------------------------------|------------------------------------------------|----------------------|
| Introducción al tratamiento de agua en el hogar (TANDAS) | `data/courses/introTandas.ts` | Equipo de contenidos educativos |
| Sedimentación del agua en el hogar | `data/courses/sedimentation.ts`                | Equipo de procesos físicos |
| Filtración del agua en el hogar    | `data/courses/filtration.ts`                   | Equipo de diseño de filtros |
| Desinfección del agua en el hogar  | `data/courses/disinfection.ts`                 | Especialistas químicos |
| Almacenamiento seguro del agua en el hogar | `data/courses/safeStorage.ts`                  | Equipo de higiene y control |

Cada responsable puede actualizar el archivo correspondiente sin interferir en los demás cursos. Los módulos incluyen contenido, recursos y quizzes; cualquier cambio debe acompañarse de las opciones correctas e indicación de respuesta correcta (`isCorrect`).

## Comandos disponibles

```bash
# Limpiar datos educativos (quiz/options/resources/modules/courses)
bun run scripts/db/cleanup.ts --educational

# Limpiar absolutamente todo (incluye usuarios y sesiones)
bun run scripts/db/cleanup.ts --all

# Sembrar todos los cursos definidos
bun run scripts/seed/index.ts

# Sembrar un curso específico (filtra por título/categoría)
bun run scripts/seed/index.ts --course="Sedimentación"

# Simular sin escribir (útil para revisar logs)
bun run scripts/seed/index.ts --dry-run

# Flujo completo recomendado para entornos locales de test
bun run scripts/db/cleanup.ts --educational && bun run scripts/seed/index.ts
```

> **Nota:** prefija los comandos con `bun --env-file=.env.test` cuando necesites apuntar a la base de datos de pruebas.

## Buenas prácticas

- Ejecuta `db:clean` antes de `db:seed` si necesitas reescritura total de módulos/quizzes (los scripts eliminan módulos existentes para evitar duplicados).
- Mantén los recursos en repositorios estables (CDN, S3, YouTube oficial). No utilices rutas locales.
- Documenta en el PR cualquier cambio en la narrativa de módulos para que el equipo de contenidos valide la coherencia pedagógica.

