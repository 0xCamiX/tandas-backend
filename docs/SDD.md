# Software Design Document (SDD)
## TANDAS Backend - Arquitectura y Diseño Técnico

**Versión:** 1.0  
**Fecha:** 2025-01-09  
**Autor:** Equipo TANDAS

---

## 1. Introducción

### 1.1 Propósito
Este documento describe la arquitectura, diseño y especificaciones técnicas del backend de TANDAS, una plataforma educativa sobre pretratamiento de agua en casa.

### 1.2 Alcance
Este documento cubre:
- Arquitectura del sistema
- Diseño de la base de datos
- Estructura de la API
- Patrones de diseño implementados
- Especificaciones técnicas de componentes

### 1.3 Audiencia
- Desarrolladores del equipo
- Arquitectos de software
- Revisores técnicos
- Mantenedores del sistema

---

## 2. Arquitectura del Sistema

### 2.1 Arquitectura General

El backend de TANDAS sigue una **arquitectura MVC Layered (por capas)**, que separa las responsabilidades en diferentes niveles:

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│         (Controllers/Routes)         │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│          Business Logic Layer        │
│              (Services)              │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│          Data Access Layer          │
│        (Models/Repositories)        │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│           Database Layer             │
│         (PostgreSQL/Prisma)          │
└─────────────────────────────────────┘
```

### 2.2 Capas de la Arquitectura

#### 2.2.1 Presentation Layer (Controladores/Rutas)
**Responsabilidades:**
- Recibir peticiones HTTP
- Validar datos de entrada
- Invocar servicios apropiados
- Formatear respuestas HTTP
- Manejar códigos de estado

**Componentes:**
- `controllers/`: Controladores que manejan la lógica de presentación
- `routes/`: Definición de rutas y endpoints
- `middlewares/`: Middleware de autenticación, validación, etc.

#### 2.2.2 Business Logic Layer (Servicios)
**Responsabilidades:**
- Implementar lógica de negocio
- Coordinar operaciones entre modelos
- Validar reglas de negocio
- Manejar transacciones complejas

**Componentes:**
- `services/`: Servicios que encapsulan la lógica de negocio

#### 2.2.3 Data Access Layer (Modelos/Repositorios)
**Responsabilidades:**
- Interactuar con la base de datos
- Abstraer operaciones de datos
- Mapear entre modelos de dominio y modelos de base de datos

**Componentes:**
- `models/`: Modelos de datos y repositorios
- `db/prisma.ts`: Cliente de Prisma

#### 2.2.4 Database Layer
**Responsabilidades:**
- Almacenar datos persistentes
- Garantizar integridad referencial
- Optimizar consultas

**Tecnología:**
- PostgreSQL con Prisma ORM

---

## 3. Estructura del Proyecto

### 3.1 Estructura de Directorios

```
backend/
├── src/
│   ├── app.ts                    # Configuración de Express
│   ├── server.ts                 # Punto de entrada
│   ├── controllers/              # Controladores (Presentation Layer)
│   │   ├── courseController.ts
│   │   ├── moduleController.ts
│   │   ├── enrollmentController.ts
│   │   ├── quizController.ts
│   │   └── progressController.ts
│   ├── services/                 # Servicios (Business Logic Layer)
│   │   ├── courseService.ts
│   │   ├── moduleService.ts
│   │   ├── enrollmentService.ts
│   │   ├── quizService.ts
│   │   └── progressService.ts
│   ├── models/                   # Modelos/Repositorios (Data Access Layer)
│   │   ├── courseModel.ts
│   │   ├── moduleModel.ts
│   │   ├── enrollmentModel.ts
│   │   ├── quizModel.ts
│   │   └── userModel.ts
│   ├── routes/                    # Definición de rutas
│   │   ├── courseRoutes.ts
│   │   ├── moduleRoutes.ts
│   │   ├── enrollmentRoutes.ts
│   │   ├── quizRoutes.ts
│   │   └── index.ts
│   ├── middlewares/               # Middleware personalizado
│   │   ├── authentication.ts
│   │   ├── validation.ts
│   │   └── errorHandler.ts
│   ├── db/
│   │   └── prisma.ts             # Cliente de Prisma
│   ├── lib/
│   │   └── auth.ts                # Configuración de Better Auth
│   ├── types/                     # Tipos TypeScript
│   │   └── index.ts
│   └── utils/                      # Utilidades
│       └── errors.ts
├── prisma/
│   ├── schema.prisma              # Esquema de base de datos
│   └── migrations/                # Migraciones
├── docs/                          # Documentación
│   ├── PDD.md
│   └── SDD.md
└── package.json
```

### 3.2 Convenciones de Nomenclatura

- **Archivos**: camelCase (ej: `courseController.ts`)
- **Clases**: PascalCase (ej: `CourseController`)
- **Funciones**: camelCase (ej: `getCourseById`)
- **Constantes**: UPPER_SNAKE_CASE (ej: `MAX_QUIZ_ATTEMPTS`)
- **Tipos/Interfaces**: PascalCase (ej: `CourseResponse`)

---

## 4. Diseño de Base de Datos

### 4.1 Modelo de Datos

#### 4.1.1 Modelos de Autenticación

**User**
```prisma
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  name          String?
  emailVerified Boolean   @default(false)
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @default(now()) @updatedAt
  
  // Relaciones educativas
  enrollments       Enrollment[]
  moduleCompletions ModuleCompletion[]
  quizAttempts      QuizAttempt[]
}
```

**Session, Account, Verification**
- Modelos estándar de Better Auth para gestión de sesiones y autenticación

#### 4.1.2 Modelos Educativos

**Course**
```prisma
model Course {
  id          String       @id @default(uuid())
  title       String
  description String?
  imageUrl    String?
  category    String       // "sedimentación", "filtración", etc.
  level       CourseLevel  // BEGINNER, INTERMEDIATE, ADVANCED
  status      CourseStatus @default(INACTIVE) // ACTIVE, INACTIVE
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @default(now()) @updatedAt
  
  modules    Module[]
  enrollments Enrollment[]
}
```

**Module**
```prisma
model Module {
  id          String   @id @default(uuid())
  courseId    String
  title       String
  content     String?  // Contenido de texto
  videoUrl    String?
  order       Int      @default(0)
  duration    Int?     @default(0) // minutos
  createdAt   DateTime @default(now())
  updatedAt   DateTime @default(now()) @updatedAt
  
  course      Course          @relation(...)
  quizzes     Quiz[]
  resources   Resource[]
  completions ModuleCompletion[]
}
```

**Quiz**
```prisma
model Quiz {
  id          String   @id @default(uuid())
  moduleId    String
  question    String
  type        QuizType @default(MULTIPLE_CHOICE)
  explanation String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @default(now()) @updatedAt
  
  module   Module      @relation(...)
  options  QuizOption[]
  attempts QuizAttempt[]
}
```

**QuizOption**
```prisma
model QuizOption {
  id         String   @id @default(uuid())
  quizId     String
  optionText String
  isCorrect  Boolean  @default(false)
  order      Int      @default(0)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @default(now()) @updatedAt
  
  quiz      Quiz          @relation(...)
  responses QuizResponse[]
}
```

**Resource**
```prisma
model Resource {
  id          String       @id @default(uuid())
  moduleId    String
  resourceType ResourceType // PDF, DOC, PPT, VIDEO, LINK, OTHER
  url         String
  title       String?
  description String?
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @default(now()) @updatedAt
  
  module Module @relation(...)
}
```

#### 4.1.3 Modelos de Progreso

**Enrollment**
```prisma
model Enrollment {
  id         String    @id @default(uuid())
  userId     String
  courseId   String
  enrolledAt DateTime  @default(now())
  progress   Float     @default(0) // 0.0 a 1.0
  completedAt DateTime?
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @default(now()) @updatedAt
  
  user   User   @relation(...)
  course Course @relation(...)
  
  @@unique([userId, courseId])
}
```

**ModuleCompletion**
```prisma
model ModuleCompletion {
  id         String   @id @default(uuid())
  userId     String
  moduleId   String
  completedAt DateTime @default(now())
  createdAt  DateTime @default(now())
  updatedAt  DateTime @default(now()) @updatedAt
  
  user   User   @relation(...)
  module Module @relation(...)
  
  @@unique([userId, moduleId])
}
```

**QuizAttempt**
```prisma
model QuizAttempt {
  id         String   @id @default(uuid())
  userId     String
  quizId     String
  score       Float    // 0.0 a 1.0
  isCorrect  Boolean
  attemptedAt DateTime @default(now())
  createdAt  DateTime @default(now())
  updatedAt  DateTime @default(now()) @updatedAt
  
  user     User          @relation(...)
  quiz     Quiz          @relation(...)
  responses QuizResponse[]
}
```

**QuizResponse**
```prisma
model QuizResponse {
  id           String   @id @default(uuid())
  attemptId    String
  quizOptionId String
  createdAt    DateTime @default(now())
  
  attempt    QuizAttempt @relation(...)
  quizOption QuizOption  @relation(...)
}
```

### 4.2 Índices y Optimización

**Índices Principales:**
- `courses`: status, category, level
- `modules`: courseId, (courseId, order)
- `quizzes`: moduleId
- `quiz_options`: quizId
- `resources`: moduleId
- `enrollments`: userId, courseId, (userId, courseId) único
- `module_completions`: userId, moduleId, (userId, moduleId) único
- `quiz_attempts`: userId, quizId, (userId, quizId)

### 4.3 Relaciones y Constraints

- **Cascade Delete**: Eliminar un curso elimina sus módulos, y eliminar un módulo elimina sus quizzes y recursos
- **Unique Constraints**: Un usuario solo puede estar inscrito una vez por curso, y completar un módulo una vez
- **Foreign Keys**: Todas las relaciones tienen foreign keys con validación

---

## 5. Diseño de API

### 5.1 Convenciones REST

- **GET**: Obtener recursos
- **POST**: Crear recursos
- **PUT**: Actualizar recursos completos
- **PATCH**: Actualizar recursos parciales
- **DELETE**: Eliminar recursos

### 5.2 Estructura de URLs

```
/api/v1/
├── /auth/*                    # Better Auth endpoints
├── /courses                   # Gestión de cursos
│   ├── GET    /               # Listar cursos
│   ├── GET    /:id            # Obtener curso
│   ├── POST   /               # Crear curso (admin)
│   ├── PUT    /:id            # Actualizar curso (admin)
│   ├── DELETE /:id            # Eliminar curso (admin)
│   └── /:courseId/modules     # Módulos del curso
├── /modules                   # Gestión de módulos
│   ├── GET    /:id            # Obtener módulo
│   ├── POST   /               # Crear módulo (admin)
│   ├── PUT    /:id            # Actualizar módulo (admin)
│   ├── DELETE /:id            # Eliminar módulo (admin)
│   └── /:id/complete          # Marcar como completado
├── /enrollments               # Inscripciones
│   ├── POST   /courses/:courseId # Inscribirse
│   ├── GET    /               # Mis inscripciones
│   └── GET    /:id             # Obtener inscripción
├── /quizzes                   # Quizzes
│   ├── GET    /modules/:moduleId # Quizzes de módulo
│   ├── POST   /:id/attempt     # Realizar intento
│   └── GET    /:id/attempts    # Mis intentos
└── /progress                  # Progreso
    ├── GET    /me             # Mi progreso general
    └── GET    /courses/:id    # Progreso en curso
```

### 5.3 Formato de Respuestas

**Respuesta Exitosa:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operación exitosa"
}
```

**Respuesta de Error:**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Mensaje de error descriptivo",
    "details": { ... }
  }
}
```

### 5.4 Códigos de Estado HTTP

- **200 OK**: Operación exitosa
- **201 Created**: Recurso creado exitosamente
- **400 Bad Request**: Datos inválidos
- **401 Unauthorized**: No autenticado
- **403 Forbidden**: No autorizado
- **404 Not Found**: Recurso no encontrado
- **409 Conflict**: Conflicto (ej: ya inscrito)
- **500 Internal Server Error**: Error del servidor

---

## 6. Componentes Principales

### 6.1 Controladores

**Responsabilidades:**
- Validar datos de entrada
- Invocar servicios
- Formatear respuestas
- Manejar errores HTTP

**Ejemplo de Estructura:**
```typescript
export class CourseController {
  async getAllCourses(req: Request, res: Response) { ... }
  async getCourseById(req: Request, res: Response) { ... }
  async createCourse(req: Request, res: Response) { ... }
  async updateCourse(req: Request, res: Response) { ... }
  async deleteCourse(req: Request, res: Response) { ... }
}
```

### 6.2 Servicios

**Responsabilidades:**
- Lógica de negocio
- Validaciones de reglas de negocio
- Coordinación entre modelos
- Transacciones complejas

**Ejemplo de Estructura:**
```typescript
export class CourseService {
  async getAllCourses(filters?: CourseFilters): Promise<Course[]> { ... }
  async getCourseById(id: string): Promise<Course> { ... }
  async createCourse(data: CreateCourseDto): Promise<Course> { ... }
  async updateCourse(id: string, data: UpdateCourseDto): Promise<Course> { ... }
  async deleteCourse(id: string): Promise<void> { ... }
}
```

### 6.3 Modelos/Repositorios

**Responsabilidades:**
- Acceso a datos
- Consultas a base de datos
- Mapeo de datos

**Ejemplo de Estructura:**
```typescript
export class CourseModel {
  async findAll(filters?: CourseFilters): Promise<Course[]> { ... }
  async findById(id: string): Promise<Course | null> { ... }
  async create(data: CreateCourseData): Promise<Course> { ... }
  async update(id: string, data: UpdateCourseData): Promise<Course> { ... }
  async delete(id: string): Promise<void> { ... }
}
```

### 6.4 Middleware

**Tipos de Middleware:**
- **Authentication**: Verificar tokens de sesión
- **Authorization**: Verificar permisos
- **Validation**: Validar datos de entrada
- **Error Handling**: Manejo centralizado de errores
- **Logging**: Registro de peticiones

---

## 7. Seguridad

### 7.1 Autenticación
- Better Auth con Prisma Adapter
- Tokens de sesión con expiración
- Cookies HTTP-only para sesiones

### 7.2 Autorización
- Verificación de roles (por implementar)
- Middleware de autenticación en rutas protegidas
- Validación de propiedad de recursos

### 7.3 Validación
- Validación de inputs en controladores
- Sanitización de datos
- Validación de tipos con TypeScript

### 7.4 Protección de Datos
- Encriptación de contraseñas (Better Auth)
- HTTPS obligatorio
- Validación de CORS

---

## 8. Manejo de Errores

### 8.1 Tipos de Errores

**Errores de Validación:**
```typescript
class ValidationError extends Error {
  code: "VALIDATION_ERROR"
  fields: { [key: string]: string[] }
}
```

**Errores de Negocio:**
```typescript
class BusinessError extends Error {
  code: "BUSINESS_ERROR"
  message: string
}
```

**Errores de Base de Datos:**
```typescript
class DatabaseError extends Error {
  code: "DATABASE_ERROR"
  originalError: Error
}
```

### 8.2 Middleware de Errores

```typescript
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Log del error
  // Formatear respuesta de error
  // Enviar respuesta apropiada
}
```

---

## 9. Testing

### 9.1 Estrategia de Testing

- **Unit Tests**: Servicios y modelos
- **Integration Tests**: Endpoints de API
- **E2E Tests**: Flujos completos de usuario

### 9.2 Herramientas

- **Jest** o **Bun Test**: Framework de testing
- **Supertest**: Testing de APIs HTTP
- **Prisma Mock**: Mocking de base de datos

---

## 10. Logging y Monitoreo

### 10.1 Logging
- **Morgan**: Logging de peticiones HTTP
- **Winston** o similar: Logging estructurado
- Niveles de log: DEBUG, INFO, WARN, ERROR

### 10.2 Monitoreo
- Health check endpoint: `/health`
- Métricas de rendimiento
- Alertas de errores

---

## 11. Despliegue

### 11.1 Variables de Entorno

```env
DATABASE_URL=postgresql://...
PORT=3000
NODE_ENV=production
AUTH_SECRET=...
```

### 11.2 Build y Deploy

```bash
# Build
bun run build

# Start
bun run start
```

---

## 12. Mejoras Futuras

### 12.1 Corto Plazo
- Caché con Redis
- Rate limiting
- Paginación en listados
- Búsqueda y filtros avanzados

### 12.2 Mediano Plazo
- Sistema de notificaciones
- WebSockets para actualizaciones en tiempo real
- Sistema de archivos para recursos
- CDN para videos

### 12.3 Largo Plazo
- Microservicios
- GraphQL API
- Sistema de analytics
- Machine Learning para recomendaciones

---

## 13. Referencias Técnicas

- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Better Auth Documentation](https://www.better-auth.com/docs)
- [Bun Documentation](https://bun.sh/docs)
- [REST API Best Practices](https://restfulapi.net/)

---

**Última actualización:** 2025-01-09

