# API Documentation
## YAKU Backend REST API

**Version:** 1.0  
**Base URL:** `/api/v1`  
**Authentication:** Better Auth (Session-based)

---

## Overview

The YAKU API provides endpoints for managing educational content related to water pretreatment. The API follows REST principles and returns JSON responses.

### Base Response Format

**Success Response:**
```json
{
  "success": true,
  "data": { },
  "message": "Operation successful"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

### HTTP Status Codes

- `200` OK - Request succeeded
- `201` Created - Resource created successfully
- `400` Bad Request - Invalid input data
- `401` Unauthorized - Authentication required
- `403` Forbidden - Insufficient permissions
- `404` Not Found - Resource not found
- `409` Conflict - Resource conflict (e.g., already enrolled)
- `500` Internal Server Error - Server error

---

## Authentication

### POST `/api/auth/sign-up/email`
Register a new user with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "User Name"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "User Name"
  },
  "session": {
    "id": "uuid",
    "expiresAt": "2024-12-31T23:59:59Z"
  }
}
```

### POST `/api/auth/sign-in/email`
Sign in with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:** Same as sign-up

### POST `/api/auth/sign-out`
Sign out current user.

**Response:**
```json
{
  "success": true
}
```

---

## Courses

### GET `/api/v1/courses`
Get all courses with optional filters.

**Query Parameters:**
- `status` (optional): `ACTIVO` | `INACTIVO`
- `category` (optional): Filter by category
- `level` (optional): `INICIAL` | `MEDIO` | `AVANZADO`
- `search` (optional): Search in title and description

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Filtración de Agua",
      "description": "Aprende técnicas de filtración",
      "imageUrl": "https://...",
      "category": "filtración",
      "level": "INICIAL",
      "status": "ACTIVO",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### GET `/api/v1/courses/:id`
Get a course by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Filtración de Agua",
    "description": "Aprende técnicas de filtración",
    "imageUrl": "https://...",
    "category": "filtración",
    "level": "INICIAL",
    "status": "ACTIVO",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### GET `/api/v1/courses/:courseId/modules`
Get a course with all its modules.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Filtración de Agua",
    "modules": [
      {
        "id": "uuid",
        "title": "Introducción",
        "content": "...",
        "videoUrl": "https://...",
        "order": 1,
        "duration": 15
      }
    ]
  }
}
```

### POST `/api/v1/courses`
Create a new course (requires authentication).

**Request Body:**
```json
{
  "title": "Filtración de Agua",
  "description": "Aprende técnicas de filtración",
  "imageUrl": "https://...",
  "category": "filtración",
  "level": "INICIAL",
  "status": "ACTIVO"
}
```

**Response:** Created course object (201)

### PUT `/api/v1/courses/:id`
Update a course (requires authentication).

**Request Body:** Same as create (all fields optional)

**Response:** Updated course object

### DELETE `/api/v1/courses/:id`
Delete a course (requires authentication).

**Response:**
```json
{
  "success": true,
  "message": "Curso eliminado exitosamente"
}
```

---

## Modules

### GET `/api/v1/modules`
Get all modules with optional filters.

**Query Parameters:**
- `courseId` (optional): Filter by course ID

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "courseId": "uuid",
      "title": "Introducción a la Filtración",
      "content": "...",
      "videoUrl": "https://...",
      "order": 1,
      "duration": 15,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### GET `/api/v1/modules/:id`
Get a module by ID.

**Response:** Single module object

### GET `/api/v1/modules/:id/full`
Get a module with all relations (course, quizzes, resources).

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Introducción",
    "content": "...",
    "course": { },
    "quizzes": [ ],
    "resources": [ ]
  }
}
```

### POST `/api/v1/modules`
Create a new module (requires authentication).

**Request Body:**
```json
{
  "courseId": "uuid",
  "title": "Introducción",
  "content": "...",
  "videoUrl": "https://...",
  "order": 1,
  "duration": 15
}
```

**Response:** Created module object (201)

### PUT `/api/v1/modules/:id`
Update a module (requires authentication).

**Request Body:** Same as create (all fields optional)

**Response:** Updated module object

### DELETE `/api/v1/modules/:id`
Delete a module (requires authentication).

**Response:**
```json
{
  "success": true,
  "message": "Módulo eliminado exitosamente"
}
```

---

## Enrollments

All enrollment endpoints require authentication.

### GET `/api/v1/enrollments`
Get all enrollments with optional filters.

**Query Parameters:**
- `userId` (optional): Filter by user ID
- `courseId` (optional): Filter by course ID

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "courseId": "uuid",
      "progress": 0.5,
      "enrolledAt": "2024-01-01T00:00:00Z",
      "completedAt": null
    }
  ]
}
```

### GET `/api/v1/enrollments/me`
Get all enrollments for the current user.

**Response:** Array of enrollment objects

### GET `/api/v1/enrollments/courses/:courseId`
Check if current user is enrolled in a course.

**Response:**
```json
{
  "success": true,
  "data": {
    "enrolled": true
  }
}
```

### POST `/api/v1/enrollments/courses/:courseId`
Enroll in a course.

**Response:** Created enrollment object (201)

### GET `/api/v1/enrollments/:id`
Get an enrollment by ID.

**Response:** Single enrollment object

### DELETE `/api/v1/enrollments/:id`
Unenroll from a course.

**Response:**
```json
{
  "success": true,
  "message": "Inscripción eliminada exitosamente"
}
```

---

## Quizzes

### GET `/api/v1/quizzes`
Get all quizzes with optional filters.

**Query Parameters:**
- `moduleId` (optional): Filter by module ID

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "moduleId": "uuid",
      "question": "¿Qué es la filtración?",
      "type": "MULTIPLE_CHOICE",
      "explanation": "..."
    }
  ]
}
```

### GET `/api/v1/quizzes/modules/:moduleId`
Get all quizzes for a specific module.

**Response:** Array of quiz objects

### GET `/api/v1/quizzes/:id/options`
Get a quiz with all its options.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "question": "¿Qué es la filtración?",
    "type": "MULTIPLE_CHOICE",
    "explanation": "...",
    "options": [
      {
        "id": "uuid",
        "optionText": "Proceso de separación",
        "isCorrect": true,
        "order": 1
      }
    ]
  }
}
```

### GET `/api/v1/quizzes/:id`
Get a quiz by ID (requires authentication).

**Response:** Single quiz object

### POST `/api/v1/quizzes`
Create a new quiz (requires authentication).

**Request Body:**
```json
{
  "moduleId": "uuid",
  "question": "¿Qué es la filtración?",
  "type": "MULTIPLE_CHOICE",
  "explanation": "...",
  "options": [
    {
      "optionText": "Proceso de separación",
      "isCorrect": true,
      "order": 1
    }
  ]
}
```

**Response:** Created quiz with options (201)

### PUT `/api/v1/quizzes/:id`
Update a quiz (requires authentication).

**Request Body:** Same as create (all fields optional)

**Response:** Updated quiz object

### DELETE `/api/v1/quizzes/:id`
Delete a quiz (requires authentication).

**Response:**
```json
{
  "success": true,
  "message": "Quiz eliminado exitosamente"
}
```

### POST `/api/v1/quizzes/:id/attempt`
Submit a quiz attempt (requires authentication).

**Request Body:**
```json
{
  "selectedOptionIds": ["uuid1", "uuid2"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "quizId": "uuid",
    "score": 1.0,
    "isCorrect": true,
    "attemptedAt": "2024-01-01T00:00:00Z"
  },
  "message": "Intento registrado exitosamente"
}
```

### GET `/api/v1/quizzes/:id/attempts`
Get all user attempts for a quiz (requires authentication).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "score": 1.0,
      "isCorrect": true,
      "attemptedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

## Module Completions

All endpoints require authentication.

### GET `/api/v1/module-completions`
Get all module completions with optional filters.

**Query Parameters:**
- `userId` (optional): Filter by user ID
- `moduleId` (optional): Filter by module ID
- `courseId` (optional): Filter by course ID

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "moduleId": "uuid",
      "completedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### GET `/api/v1/module-completions/me`
Get all module completions for the current user.

**Response:** Array of completion objects

### POST `/api/v1/module-completions/modules/:moduleId`
Mark a module as completed.

**Response:** Created completion object (201)

### DELETE `/api/v1/module-completions/:id`
Unmark a module as completed.

**Response:**
```json
{
  "success": true,
  "message": "Completación eliminada exitosamente"
}
```

---

## Users

All user endpoints require authentication.

### GET `/api/v1/users/me`
Get current user profile.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "User Name",
    "image": "https://...",
    "emailVerified": true,
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### GET `/api/v1/users/me/full`
Get current user profile with all educational relations.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "User Name",
    "enrollments": [ ],
    "moduleCompletions": [ ],
    "quizAttempts": [ ]
  }
}
```

### PUT `/api/v1/users/me`
Update current user profile.

**Request Body:**
```json
{
  "name": "New Name",
  "image": "https://..."
}
```

**Response:** Updated user object

### GET `/api/v1/users/me/stats`
Get current user statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalEnrollments": 5,
    "completedCourses": 2,
    "modulesCompleted": 25,
    "quizzesAttempted": 30,
    "averageScore": 0.85
  }
}
```

### GET `/api/v1/users/me/progress`
Get user progress across all courses.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "courseId": "uuid",
      "courseTitle": "Filtración",
      "progress": 0.5,
      "modulesCompleted": 5,
      "totalModules": 10,
      "lastActivity": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### GET `/api/v1/users/me/progress/:courseId`
Get user progress in a specific course.

**Response:**
```json
{
  "success": true,
  "data": {
    "courseId": "uuid",
    "courseTitle": "Filtración",
    "progress": 0.5,
    "modulesCompleted": 5,
    "totalModules": 10,
    "completedModuleIds": ["uuid1", "uuid2"],
    "lastActivity": "2024-01-01T00:00:00Z"
  }
}
```

### GET `/api/v1/users/me/enrollments`
Get all enrollments with course details for current user.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "progress": 0.5,
      "enrolledAt": "2024-01-01T00:00:00Z",
      "course": {
        "id": "uuid",
        "title": "Filtración",
        "imageUrl": "https://..."
      }
    }
  ]
}
```

---

## Health Check

### GET `/health`
System health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z",
  "uptime": 3600.5
}
```

---

## Data Models

### Course
```typescript
{
  id: string;              // UUID
  title: string;
  description: string | null;
  imageUrl: string | null;
  category: string;
  level: 'INICIAL' | 'MEDIO' | 'AVANZADO';
  status: 'ACTIVO' | 'INACTIVO';
  createdAt: Date;
  updatedAt: Date;
}
```

### Module
```typescript
{
  id: string;              // UUID
  courseId: string;
  title: string;
  content: string | null;
  videoUrl: string | null;
  order: number;
  duration: number | null; // minutes
  createdAt: Date;
  updatedAt: Date;
}
```

### Quiz
```typescript
{
  id: string;              // UUID
  moduleId: string;
  question: string;
  type: 'MULTIPLE_CHOICE';
  explanation: string | null;
  createdAt: Date;
  updatedAt: Date;
}
```

### QuizOption
```typescript
{
  id: string;              // UUID
  quizId: string;
  optionText: string;
  isCorrect: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Enrollment
```typescript
{
  id: string;              // UUID
  userId: string;
  courseId: string;
  progress: number;        // 0.0 to 1.0
  enrolledAt: Date;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
```

### ModuleCompletion
```typescript
{
  id: string;              // UUID
  userId: string;
  moduleId: string;
  completedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### QuizAttempt
```typescript
{
  id: string;              // UUID
  userId: string;
  quizId: string;
  score: number;           // 0.0 to 1.0
  isCorrect: boolean;
  attemptedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### User
```typescript
{
  id: string;              // UUID
  email: string;
  name: string | null;
  image: string | null;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## Rate Limiting

The API implements rate limiting through Nginx:
- **Rate**: 10 requests per second per IP
- **Burst**: 20 requests
- **Response**: 429 Too Many Requests

---

## Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Input validation failed |
| `NOT_FOUND` | Resource not found |
| `UNAUTHORIZED` | Authentication required |
| `FORBIDDEN` | Insufficient permissions |
| `CONFLICT` | Resource conflict |
| `INTERNAL_ERROR` | Server error |

---

## Swagger Documentation

Interactive API documentation is available at:

**Development:** `http://localhost:3000/api/v1/docs`  
**Production:** `https://your-domain.com/api/v1/docs`

---

## Examples

### Complete Course Enrollment Flow

```bash
# 1. Sign up
curl -X POST http://localhost:3000/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "securepass123",
    "name": "Student"
  }'

# 2. Get courses
curl http://localhost:3000/api/v1/courses?status=ACTIVO

# 3. Enroll in course
curl -X POST http://localhost:3000/api/v1/enrollments/courses/COURSE_ID \
  -H "Cookie: better-auth.session_token=YOUR_TOKEN"

# 4. Get course modules
curl http://localhost:3000/api/v1/courses/COURSE_ID/modules

# 5. Complete a module
curl -X POST http://localhost:3000/api/v1/module-completions/modules/MODULE_ID \
  -H "Cookie: better-auth.session_token=YOUR_TOKEN"

# 6. Take a quiz
curl -X POST http://localhost:3000/api/v1/quizzes/QUIZ_ID/attempt \
  -H "Cookie: better-auth.session_token=YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "selectedOptionIds": ["OPTION_ID_1", "OPTION_ID_2"]
  }'

# 7. Check progress
curl http://localhost:3000/api/v1/users/me/progress/COURSE_ID \
  -H "Cookie: better-auth.session_token=YOUR_TOKEN"
```

---

**Last Updated:** December 2026
**API Version:** 1.0

