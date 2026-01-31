# Product Design Document
## YAKU - Water Pretreatment Educational Platform

**Version:** 1.0  
**Date:** December 2025  
**Author:** YAKU Team

---

## 1. Product Overview

### 1.1 Vision

YAKU is an educational platform designed to teach domestic water pretreatment techniques. The platform provides structured courses with multimedia content, interactive quizzes, and progress tracking to empower individuals to improve water quality in their homes.

### 1.2 Target Audience

- Individuals interested in water quality improvement
- Communities without access to potable water
- Public health students and educators
- Professionals seeking practical water treatment knowledge

### 1.3 Core Value Proposition

Accessible, self-paced education on essential water pretreatment methods through structured courses with practical, actionable content.

---

## 2. Product Features

### 2.1 User Management

**Registration & Authentication:**
- Email and password registration
- Secure session-based authentication
- Email verification
- Profile management

**User Profile:**
- Personal information (name, email, avatar)
- Learning statistics
- Course enrollments
- Progress tracking

### 2.2 Course Catalog

**Course Discovery:**
- Browse all available courses
- Filter by status (active/inactive)
- Filter by category (sedimentation, filtration, etc.)
- Filter by level (inicial, medio, avanzado)
- Search by title and description

**Course Information:**
- Course title and description
- Category and difficulty level
- Course image
- Module count and structure
- Enrollment status

**Course Categories:**
1. Sedimentación - Particle sedimentation techniques
2. Filtración - Filtration systems and methods
3. Desinfección - Chemical and solar disinfection
4. Almacenamiento Seguro - Safe water storage practices

**Difficulty Levels:**
- INICIAL - Beginner level
- MEDIO - Intermediate level
- AVANZADO - Advanced level

### 2.3 Learning Content

**Course Structure:**
- Courses contain multiple modules
- Modules are presented in sequential order
- Each module includes:
  - Educational text content
  - Video content (optional)
  - Downloadable resources (PDFs, documents, presentations)
  - Knowledge assessment quizzes
  - Duration estimates

**Module Resources:**
- PDF documents
- DOC/PPT files
- Video links
- External links
- Supplementary materials

### 2.4 Knowledge Assessment

**Quiz System:**
- Multiple choice questions per module
- Immediate feedback on submissions
- Explanations for correct answers
- Multiple attempts allowed
- Score tracking (0.0 to 1.0)

**Quiz Features:**
- Question text
- Multiple answer options
- Correct answer validation
- Detailed explanations
- Attempt history

### 2.5 Progress Tracking

**Course Progress:**
- Automatic progress calculation
- Completion percentage per course
- Module completion status
- Last activity tracking

**User Statistics:**
- Total courses enrolled
- Completed courses count
- Modules completed
- Quizzes attempted
- Average quiz scores

**Progress Indicators:**
- Completed modules marked
- Progress bars for courses
- Enrollment dates
- Completion timestamps

### 2.6 Enrollment System

**Enrollment Features:**
- One-click course enrollment
- Enrollment verification
- Unenroll capability
- Progress persistence
- Multiple concurrent enrollments

**Enrollment Management:**
- View all enrolled courses
- Track progress per course
- Access course modules
- Complete modules in sequence

---

## 3. User Flows

### 3.1 New User Registration

```
1. User visits platform
2. Clicks "Register"
3. Enters email, password, name
4. Submits registration form
5. Receives confirmation
6. Redirected to course catalog
```

### 3.2 Course Enrollment

```
1. User browses course catalog
2. Selects course of interest
3. Views course details and modules
4. Clicks "Enroll"
5. Enrollment confirmed
6. Access granted to course modules
```

### 3.3 Learning Journey

```
1. User accesses enrolled course
2. Views module list
3. Opens first module
4. Reads content and watches video
5. Downloads resources (optional)
6. Takes module quiz
7. Reviews quiz results and explanation
8. Marks module as complete
9. Proceeds to next module
10. Completes course
```

### 3.4 Progress Review

```
1. User accesses profile
2. Views enrolled courses
3. Checks progress percentage
4. Reviews completed modules
5. Sees quiz attempt history
6. Views overall statistics
```

---

## 4. Functional Requirements

### 4.1 Authentication (RF-001 to RF-005)

- User registration with email/password
- User login with credentials
- User logout
- Session persistence
- Protected course access

### 4.2 Course Management (RF-006 to RF-010)

- View all courses with filters
- View detailed course information
- Enroll in courses
- View enrolled courses
- Track course progress

### 4.3 Learning Content (RF-011 to RF-014)

- Access course modules after enrollment
- View modules in sequential order
- Access text, video, and resources
- Download module resources

### 4.4 Assessment (RF-015 to RF-019)

- Take module quizzes
- Answer multiple choice questions
- Receive immediate feedback
- View quiz attempt history
- View quiz scores

### 4.5 Progress Tracking (RF-020 to RF-022)

- Mark modules as completed
- Automatic progress calculation
- View progress dashboard

---

## 5. Non-Functional Requirements

### 5.1 Performance

- API response time < 200ms (95th percentile)
- Support 100+ concurrent users
- Progressive video loading
- Optimized database queries

### 5.2 Security

- HTTPS communication
- Encrypted password storage
- Session token expiration
- Input validation
- Rate limiting (10 req/s per IP)
- Security headers via Nginx

### 5.3 Usability

- Intuitive navigation
- Mobile-responsive design (frontend)
- Clear error messages
- Consistent API responses
- Comprehensive API documentation

### 5.4 Scalability

- Horizontal scaling capability
- Database indexing for performance
- Connection pooling
- Resource limits per container
- Load balancer ready

### 5.5 Reliability

- 99% uptime target
- Auto-restart on failure
- Health check monitoring
- Backup and recovery procedures
- Error logging and tracking

### 5.6 Maintainability

- Modular code architecture
- Comprehensive documentation
- Consistent coding standards
- Version control
- Automated deployment pipeline

---

## 6. Data Model

### 6.1 Core Entities

**User:**
- Unique identifier
- Email (unique)
- Name
- Avatar image
- Email verification status
- Creation timestamp

**Course:**
- Unique identifier
- Title
- Description
- Category
- Difficulty level (inicial, medio, avanzado)
- Status (activo, inactivo)
- Course image
- Timestamps

**Module:**
- Unique identifier
- Course association
- Title
- Content text
- Video URL
- Sequential order
- Duration (minutes)
- Timestamps

**Quiz:**
- Unique identifier
- Module association
- Question text
- Quiz type (multiple choice)
- Explanation
- Timestamps

**QuizOption:**
- Unique identifier
- Quiz association
- Option text
- Correct answer flag
- Display order
- Timestamps

**Resource:**
- Unique identifier
- Module association
- Resource type (PDF, DOC, PPT, VIDEO, LINK)
- URL/path
- Title
- Description
- Timestamps

### 6.2 Progress Entities

**Enrollment:**
- Unique identifier
- User-Course association
- Progress (0.0 to 1.0)
- Enrollment date
- Completion date (nullable)
- Unique constraint: one enrollment per user-course pair

**ModuleCompletion:**
- Unique identifier
- User-Module association
- Completion timestamp
- Unique constraint: one completion per user-module pair

**QuizAttempt:**
- Unique identifier
- User-Quiz association
- Score (0.0 to 1.0)
- Correct flag
- Attempt timestamp
- Associated quiz responses

**QuizResponse:**
- Unique identifier
- Attempt association
- Selected option association
- Timestamp

---

## 7. API Endpoints Summary

### 7.1 Public Endpoints

- `GET /health` - Health check
- `GET /` - API information
- `GET /api/v1/docs` - Interactive documentation

### 7.2 Authentication

- `POST /api/auth/sign-up/email` - Register
- `POST /api/auth/sign-in/email` - Login
- `POST /api/auth/sign-out` - Logout

### 7.3 Courses (Public)

- `GET /api/v1/courses` - List courses with filters
- `GET /api/v1/courses/:id` - Get course details
- `GET /api/v1/courses/:courseId/modules` - Get course with modules

### 7.4 Courses (Protected)

- `POST /api/v1/courses` - Create course
- `PUT /api/v1/courses/:id` - Update course
- `DELETE /api/v1/courses/:id` - Delete course

### 7.5 Modules (Public)

- `GET /api/v1/modules` - List modules
- `GET /api/v1/modules/:id` - Get module
- `GET /api/v1/modules/:id/full` - Get module with relations

### 7.6 Modules (Protected)

- `POST /api/v1/modules` - Create module
- `PUT /api/v1/modules/:id` - Update module
- `DELETE /api/v1/modules/:id` - Delete module

### 7.7 Enrollments (All Protected)

- `GET /api/v1/enrollments` - List enrollments
- `GET /api/v1/enrollments/me` - My enrollments
- `GET /api/v1/enrollments/courses/:courseId` - Check enrollment
- `POST /api/v1/enrollments/courses/:courseId` - Enroll
- `GET /api/v1/enrollments/:id` - Get enrollment
- `DELETE /api/v1/enrollments/:id` - Unenroll

### 7.8 Quizzes (Public)

- `GET /api/v1/quizzes` - List quizzes
- `GET /api/v1/quizzes/modules/:moduleId` - Module quizzes
- `GET /api/v1/quizzes/:id/options` - Quiz with options

### 7.9 Quizzes (Protected)

- `GET /api/v1/quizzes/:id` - Get quiz
- `POST /api/v1/quizzes` - Create quiz
- `PUT /api/v1/quizzes/:id` - Update quiz
- `DELETE /api/v1/quizzes/:id` - Delete quiz
- `POST /api/v1/quizzes/:id/attempt` - Submit attempt
- `GET /api/v1/quizzes/:id/attempts` - My attempts

### 7.10 Module Completions (All Protected)

- `GET /api/v1/module-completions` - List completions
- `GET /api/v1/module-completions/me` - My completions
- `POST /api/v1/module-completions/modules/:moduleId` - Complete module
- `DELETE /api/v1/module-completions/:id` - Uncomplete module

### 7.11 Users (All Protected)

- `GET /api/v1/users/me` - Current user profile
- `GET /api/v1/users/me/full` - Profile with relations
- `PUT /api/v1/users/me` - Update profile
- `GET /api/v1/users/me/stats` - User statistics
- `GET /api/v1/users/me/progress` - All course progress
- `GET /api/v1/users/me/progress/:courseId` - Course progress
- `GET /api/v1/users/me/enrollments` - Enrollments with details

---

## 8. Success Metrics

### 8.1 Adoption Metrics

- Total registered users
- Course enrollment rate
- Course completion rate
- Average enrollments per user

### 8.2 Engagement Metrics

- Average session duration
- Modules completed per user
- Quiz attempts per module
- Return user rate
- Daily/weekly active users

### 8.3 Learning Metrics

- Average quiz scores
- Quiz pass rate (score >= 0.7)
- Module completion time
- Course completion time
- Resource download rate

### 8.4 Technical Metrics

- API response time
- Error rate
- Uptime percentage
- Concurrent users peak

---

## 9. Implementation Status

### 9.1 Phase 1 - MVP (Completed)

- Database schema design
- Better Auth integration
- Course CRUD operations
- Module CRUD operations
- Enrollment system
- Quiz system with attempts
- Module completion tracking
- User profile and progress
- API documentation (Swagger)
- Docker containerization
- Nginx reverse proxy
- GitHub Actions CI pipeline

### 9.2 Phase 2 - Enhancements (Planned)

- Role-based access control (admin, instructor, student)
- Course certificates
- Advanced search and filtering
- Pagination for large datasets
- Email notifications
- File upload for resources
- Caching layer (Redis)
- Analytics dashboard

### 9.3 Phase 3 - Scale (Future)

- Discussion forums per course
- Live video streaming
- Mobile application
- Multi-language support
- Social features (comments, ratings)
- Recommendation engine
- Gamification (badges, points)
- Third-party integrations

---

## 10. Technical Constraints

### 10.1 Current Limitations

- No file upload capability (resources are external links)
- No real-time notifications
- No admin dashboard
- No role differentiation (all authenticated users equal)
- No course previews for non-enrolled users
- No content versioning

### 10.2 Scalability Considerations

- Database hosted externally (not on EC2)
- Single EC2 instance deployment
- No load balancer currently
- No CDN for media content
- No caching layer

### 10.3 Security Considerations

- HTTPS configuration required for production
- Secrets management via environment variables
- Rate limiting at Nginx level
- No file upload validation needed (external resources)

---

## 11. Glossary

- **Course** - Complete educational program on a specific water treatment topic
- **Module** - Individual learning unit within a course
- **Quiz** - Knowledge assessment with multiple choice questions
- **Enrollment** - User registration in a specific course
- **Completion** - Marking a module as finished
- **Attempt** - Quiz submission with selected answers
- **Progress** - Percentage of course completion (0.0 to 1.0)
- **Resource** - Supplementary material (PDF, video, link)
- **Level** - Course difficulty (inicial, medio, avanzado)
- **Category** - Course topic classification

---

## 12. Documentation Index

- **API Reference:** `/docs/API.md` - Complete API endpoint documentation
- **Technical Design:** `/docs/SDD.md` - Software architecture and implementation
- **Deployment Guide:** `/README.md` - Setup and deployment instructions
- **Database Schema:** `/prisma/schema.prisma` - Data model definition

---

## 13. Contact & Support

- **Repository:** GitHub repository URL
- **API Documentation:** `https://your-domain.com/api/v1/docs`
- **Issue Tracking:** GitHub Issues
- **Team:** YAKU Development Team

---

**Last Updated:** December 2024  
**Version:** 1.0  
**Status:** MVP Completed, Production Ready
