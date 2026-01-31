# Software Design Document
## YAKU Backend - Technical Architecture

**Version:** 1.0  
**Date:** December 2026
**Author:** YAKU Team

---

## 1. Executive Summary

YAKU Backend is a REST API built with Bun, TypeScript, Express.js, and Better Auth. The system follows a layered architecture pattern with clear separation of concerns across controllers, services, and data access layers.

### Technology Stack

- **Runtime:** Bun
- **Language:** TypeScript
- **Framework:** Express.js 5
- **Database:** PostgreSQL
- **ORM:** Prisma 7
- **Authentication:** Better Auth
- **Container:** Docker
- **Reverse Proxy:** Nginx
- **Deployment:** AWS EC2 with GitHub Actions CI/CD

---

## 2. System Architecture

### 2.1 Layered Architecture

The application follows a three-tier layered architecture:

```
┌─────────────────────────────────────┐
│     Presentation Layer              │
│     (Controllers + Routes)          │
│     • HTTP request handling         │
│     • Input validation              │
│     • Response formatting           │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│     Business Logic Layer            │
│     (Services)                      │
│     • Business rules                │
│     • Transaction coordination      │
│     • Data transformation           │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│     Data Access Layer               │
│     (Models + Prisma)               │
│     • Database queries              │
│     • Data persistence              │
│     • Entity mapping                │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│     Database                        │
│     (PostgreSQL)                    │
└─────────────────────────────────────┘
```

### 2.2 Request Flow

```
HTTP Request
  → Middleware (CORS, JSON parsing)
  → Authentication Middleware (if required)
  → Validation Middleware (input schemas)
  → Controller (route handler)
  → Service (business logic)
  → Model (data access)
  → Prisma Client
  → PostgreSQL
  ← Response (formatted JSON)
```

---

## 3. Project Structure

```
src/
├── app.ts                  # Express application setup
├── server.ts               # Server entry point
├── controllers/            # Request handlers
│   ├── courseController.ts
│   ├── moduleController.ts
│   ├── enrollmentController.ts
│   ├── quizController.ts
│   ├── moduleCompletionController.ts
│   └── userController.ts
├── services/               # Business logic
│   ├── courseService.ts
│   ├── moduleService.ts
│   ├── enrollmentService.ts
│   ├── quizService.ts
│   ├── moduleCompletionService.ts
│   └── userService.ts
├── models/                 # Data access layer
│   ├── courseModel.ts
│   ├── moduleModel.ts
│   ├── enrollmentModel.ts
│   ├── quizModel.ts
│   ├── quizAttemptModel.ts
│   ├── moduleCompletionModel.ts
│   └── userModel.ts
├── routes/                 # API routes definition
│   ├── index.ts
│   ├── authRoutes.ts
│   ├── courseRoutes.ts
│   ├── moduleRoutes.ts
│   ├── enrollmentRoutes.ts
│   ├── quizRoutes.ts
│   ├── moduleCompletionRoutes.ts
│   └── userRoutes.ts
├── middlewares/            # Express middlewares
│   ├── authentication.ts   # Better Auth integration
│   └── validation.ts       # Zod schema validation
├── validators/             # Input validation schemas
│   ├── course.validators.ts
│   ├── module.validators.ts
│   ├── enrollment.validators.ts
│   ├── quiz.validators.ts
│   ├── moduleCompletion.validators.ts
│   └── user.validators.ts
├── types/                  # TypeScript type definitions
│   ├── express.d.ts
│   ├── course.types.ts
│   ├── module.types.ts
│   ├── enrollment.types.ts
│   ├── quiz.types.ts
│   ├── moduleCompletion.types.ts
│   └── user.types.ts
├── factories/              # Dependency injection
│   ├── courseFactory.ts
│   ├── moduleFactory.ts
│   ├── enrollmentFactory.ts
│   ├── quizFactory.ts
│   ├── moduleCompletionFactory.ts
│   └── userFactory.ts
├── lib/                    # External integrations
│   └── auth.ts             # Better Auth configuration
├── config/                 # Application configuration
│   └── swagger.ts          # API documentation setup
├── db/                     # Database connection
│   └── prisma.ts           # Prisma client instance
├── jobs/                   # Scheduled tasks
│   ├── scheduler.ts
│   └── cleanupSessions.ts
└── generated/              # Prisma generated code
    └── prisma/
```

---

## 4. Core Components

### 4.1 Controllers

**Responsibility:** Handle HTTP requests and responses.

```typescript
export class CourseController {
  async getAllCourses(req: Request, res: Response): Promise<void>;
  async getCourseById(req: Request, res: Response): Promise<void>;
  async createCourse(req: Request, res: Response): Promise<void>;
  async updateCourse(req: Request, res: Response): Promise<void>;
  async deleteCourse(req: Request, res: Response): Promise<void>;
}
```

Controllers:
- Extract and validate request data
- Call appropriate service methods
- Format and send HTTP responses
- Handle errors with proper status codes

### 4.2 Services

**Responsibility:** Implement business logic.

```typescript
export class CourseService {
  async getAllCourses(filters?: CourseFilters): Promise<Course[]>;
  async getCourseById(id: string): Promise<Course>;
  async createCourse(data: CreateCourseDto): Promise<Course>;
  async updateCourse(id: string, data: UpdateCourseDto): Promise<Course>;
  async deleteCourse(id: string): Promise<void>;
}
```

Services:
- Validate business rules
- Coordinate multiple data operations
- Transform data between layers
- Handle complex transactions

### 4.3 Models

**Responsibility:** Abstract database operations.

```typescript
export class CourseModel {
  async findAll(filters?: CourseFilters): Promise<Course[]>;
  async findById(id: string): Promise<Course | null>;
  async create(data: CreateCourseData): Promise<Course>;
  async update(id: string, data: UpdateCourseData): Promise<Course>;
  async delete(id: string): Promise<void>;
}
```

Models:
- Execute Prisma queries
- Map database results to domain objects
- Handle database errors
- Implement query optimizations

### 4.4 Factories

**Responsibility:** Dependency injection and module assembly.

```typescript
export function createCourseModule() {
  const model = new CourseModel(prisma);
  const service = new CourseService(model);
  const controller = new CourseController(service);
  
  return { model, service, controller };
}
```

Benefits:
- Loose coupling between components
- Easy testing with mock dependencies
- Centralized initialization
- Clear dependency graph

---

## 5. Database Design

### 5.1 Schema Overview

**Authentication Models:**
- `User` - User accounts
- `Session` - Active sessions
- `Account` - OAuth accounts
- `Verification` - Email verification

**Educational Models:**
- `Course` - Course catalog
- `Module` - Course modules
- `Quiz` - Module quizzes
- `QuizOption` - Quiz answer options
- `Resource` - Module resources (PDFs, videos, links)

**Progress Tracking:**
- `Enrollment` - User course enrollments
- `ModuleCompletion` - Completed modules
- `QuizAttempt` - Quiz submissions
- `QuizResponse` - Selected quiz answers

### 5.2 Key Relationships

```
User 1→N Enrollment N→1 Course
User 1→N ModuleCompletion N→1 Module
User 1→N QuizAttempt N→1 Quiz

Course 1→N Module
Module 1→N Quiz
Module 1→N Resource
Quiz 1→N QuizOption
QuizAttempt 1→N QuizResponse N→1 QuizOption
```

### 5.3 Indexes

Optimized queries with indexes on:
- `courses`: `status`, `category`, `level`
- `modules`: `courseId`, `(courseId, order)`
- `quizzes`: `moduleId`
- `quiz_options`: `quizId`
- `resources`: `moduleId`
- `enrollments`: `userId`, `courseId`, `(userId, courseId)` unique
- `module_completions`: `userId`, `moduleId`, `(userId, moduleId)` unique
- `quiz_attempts`: `userId`, `quizId`, `(userId, quizId)`

### 5.4 Constraints

**Cascade Deletes:**
- Deleting a course deletes all its modules
- Deleting a module deletes its quizzes and resources
- Deleting a user deletes all their progress data

**Unique Constraints:**
- User can only enroll once per course
- User can only complete a module once
- Email addresses are unique

---

## 6. API Design

### 6.1 REST Principles

The API follows REST conventions:
- Resources are nouns (courses, modules, enrollments)
- HTTP methods indicate actions (GET, POST, PUT, DELETE)
- Stateless authentication (session tokens)
- JSON request/response format

### 6.2 URL Structure

```
/api/v1/courses              # Courses collection
/api/v1/courses/:id          # Specific course
/api/v1/courses/:id/modules  # Nested resource
/api/v1/enrollments/me       # Current user resource
```

### 6.3 Authentication Strategy

**Better Auth Integration:**
- Session-based authentication
- HTTP-only cookies for security
- Session expiration and renewal
- Email/password authentication

**Protected Routes:**
```typescript
// Public routes
router.get('/courses', controller.getAllCourses);

// Protected routes (require authentication)
router.use(authenticate);
router.post('/courses', controller.createCourse);
```

### 6.4 Validation Strategy

**Zod Schema Validation:**
```typescript
const createCourseSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  category: z.string(),
  level: z.enum(['INICIAL', 'MEDIO', 'AVANZADO']),
  status: z.enum(['ACTIVO', 'INACTIVO']).default('INACTIVO'),
});
```

Validation occurs at:
- Request body validation
- Query parameter validation
- Path parameter validation

---

## 7. Security

### 7.1 Authentication & Authorization

- Session tokens stored in HTTP-only cookies
- Password hashing with bcrypt (via Better Auth)
- Session expiration and automatic cleanup
- CORS configuration for frontend integration

### 7.2 Input Validation

- All inputs validated with Zod schemas
- SQL injection prevention via Prisma parameterized queries
- XSS prevention via JSON escaping
- Request size limits via Express body-parser

### 7.3 API Security

**Nginx Configuration:**
- Rate limiting: 10 requests/second per IP
- Security headers (X-Frame-Options, X-Content-Type-Options)
- Request size limits
- Timeout configurations

**Application Layer:**
- Environment variable validation
- Database connection pooling
- Error message sanitization
- Secure session management

---

## 8. Performance Optimizations

### 8.1 Database

- Appropriate indexes on frequently queried fields
- Connection pooling via Prisma
- Query optimization with selective field loading
- Cascade deletes for referential integrity

### 8.2 Application

- Async/await for non-blocking I/O
- Bun runtime for fast startup and execution
- Docker multi-stage builds for smaller images
- Health check endpoints for monitoring

### 8.3 Infrastructure

- Nginx reverse proxy for request buffering
- Docker resource limits (CPU, memory)
- Log rotation to prevent disk overflow
- Systemd auto-restart on failure

---

## 9. Error Handling

### 9.1 Error Categories

```typescript
// Validation errors
class ValidationError extends Error {
  statusCode = 400;
}

// Not found errors
class NotFoundError extends Error {
  statusCode = 404;
}

// Conflict errors (e.g., already enrolled)
class ConflictError extends Error {
  statusCode = 409;
}

// Internal errors
class InternalError extends Error {
  statusCode = 500;
}
```

### 9.2 Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": { }
  }
}
```

---

## 10. Deployment Architecture

### 10.1 Production Stack

```
Internet
   ↓
AWS EC2 (Amazon Linux 2023)
   ↓
Nginx (Reverse Proxy)
   ├─ Rate limiting
   ├─ Security headers
   ├─ Gzip compression
   └─ Health checks
   ↓
Docker Container (Backend)
   ├─ Bun runtime
   ├─ Express.js app
   └─ Health endpoint
   ↓
External PostgreSQL Database
```

### 10.2 CI/CD Pipeline

```
Developer
  → Git Push
  → GitHub Actions
     ├─ Lint & Format check
     ├─ Build TypeScript
     ├─ Build Docker image
     ├─ Push to Docker Hub
     └─ Deploy to EC2 (not implemented yet)
```

### 10.3 Container Configuration

**docker-compose.prod.yml:**
- Backend container with resource limits
- Nginx container for reverse proxy
- Shared network for internal communication
- Volume mounts for Nginx configuration
- Restart policies for resilience

**Resource Limits:**
- CPU: 1.0 cores
- Memory: 512MB
- Log rotation: 10MB x 3 files

---

## 11. Monitoring & Logging

### 11.1 Health Checks

```typescript
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
```

### 11.2 Logging Strategy

- Nginx access logs for HTTP requests
- Docker JSON file driver for container logs
- Systemd journald for service logs
- Log rotation to prevent disk overflow

### 11.3 Monitoring Points

- Health check endpoint: `/health`
- Nginx health check: `/nginx-health`
- Docker container status
- System resource usage (CPU, memory)
- Database connection pool

---

## 12. Development Workflow

### 12.1 Local Development

```bash
# Install dependencies
bun install

# Setup environment
cp .env.example .env

# Run migrations
bunx prisma migrate dev

# Start development server
bun run dev  # Runs on port 3000
```

### 12.2 Testing

```bash
# Code quality
bun run lint      # Biome linter
bun run check     # Format and lint check

# Build verification
bun run build     # TypeScript compilation
```

### 12.3 Database Migrations

```bash
# Create migration
bunx prisma migrate dev --name migration_name

# Apply to production
bunx prisma migrate deploy

# Generate Prisma client
bunx prisma generate
```

---

## 13. Best Practices Implemented

**Code Organization:**
- Clear separation of concerns
- Consistent naming conventions
- Dependency injection via factories
- TypeScript for type safety

**Security:**
- Environment variables for secrets
- Input validation on all endpoints
- Session-based authentication
- Rate limiting and security headers

**Performance:**
- Database indexes for common queries
- Connection pooling
- Async operations
- Resource limits

**Reliability:**
- Health checks
- Auto-restart policies
- Error handling
- Logging and monitoring

**Maintainability:**
- Modular architecture
- Consistent patterns
- Comprehensive documentation
- Version control

---

## 14. Future Enhancements

**Short Term:**
- Implement role-based access control (RBAC)
- Add pagination to list endpoints
- Implement search functionality
- Add request caching with Redis

**Medium Term:**
- WebSocket support for real-time updates
- File upload for course images and resources
- Email notifications for course updates
- Analytics and reporting endpoints

**Long Term:**
- Microservices architecture
- GraphQL API alternative
- Machine learning for recommendations
- Multi-language support

---

## 15. References

- Express.js: https://expressjs.com/
- Prisma ORM: https://www.prisma.io/docs
- Better Auth: https://www.better-auth.com/docs
- Bun Runtime: https://bun.sh/docs
- REST API Design: https://restfulapi.net/
- TypeScript: https://www.typescriptlang.org/

---

**Last Updated:** December 2024  
**Version:** 1.0  
**Status:** Production Ready
