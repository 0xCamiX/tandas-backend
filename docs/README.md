# Documentation Index
## TANDAS Backend Documentation

This folder contains comprehensive technical and product documentation for the TANDAS Backend API.

---

## Core Documentation

### [API.md](API.md)
**Complete API Reference**

Comprehensive REST API documentation including:
- All endpoint specifications
- Request/response formats
- Authentication requirements
- Data models and schemas
- Query parameters and filters
- Error codes and handling
- Usage examples

**Use this when:** You need API endpoint details, request/response formats, or integration guidance.

---

### [SDD.md](SDD.md)
**Software Design Document**

Technical architecture and implementation details:
- System architecture (layered architecture)
- Component structure (controllers, services, models)
- Database design and relationships
- API design patterns
- Security implementation
- Performance optimizations
- Deployment architecture
- Development workflow

**Use this when:** You need to understand system architecture, technical decisions, or implementation patterns.

---

### [PDD.md](PDD.md)
**Product Design Document**

Product requirements and specifications:
- Product vision and goals
- Feature specifications
- User flows and journeys
- Functional requirements
- Non-functional requirements
- Data model overview
- Success metrics
- Implementation roadmap

**Use this when:** You need to understand product features, user requirements, or business logic.

---

## Documentation Philosophy

### Principles

1. **Concise and Direct**: Information presented without unnecessary verbosity
2. **Accurate**: Reflects actual implementation, not aspirational features
3. **Organized**: Clear hierarchy and logical flow
4. **Accessible**: Easy to find relevant information
5. **Up-to-date**: Documentation maintained alongside code

### Structure

```
docs/
├── README.md           # This file - documentation index
├── API.md              # API reference (implementation-focused)
├── SDD.md              # Technical architecture (developer-focused)
└── PDD.md              # Product specifications (business-focused)
```

### Audience

- **API.md**: Frontend developers, API consumers, integration partners
- **SDD.md**: Backend developers, architects, DevOps engineers
- **PDD.md**: Product managers, stakeholders, new team members

---

## Related Documentation

### Deployment & Operations

See `/.github/` for deployment and operational documentation:
- **DEPLOYMENT.md**: Complete EC2 deployment guide
- **GITHUB_SECRETS_SETUP.md**: GitHub Actions configuration
- **LOCAL_TESTING.md**: Testing and verification procedures
- **AMAZON_LINUX_NOTES.md**: Platform-specific notes

### Code Documentation

- **Prisma Schema**: `/prisma/schema.prisma` - Database schema with comments
- **Swagger UI**: `http://localhost:3000/api/v1/docs` - Interactive API documentation
- **README.md**: `/README.md` - Quick start and overview

---

## Technology Stack Summary

**Runtime & Language:**
- Bun (JavaScript runtime)
- TypeScript (type safety)

**Framework & Libraries:**
- Express.js 5 (web framework)
- Prisma 7 (ORM)
- Better Auth (authentication)
- Zod (validation)

**Database & Storage:**
- PostgreSQL (relational database)

**Infrastructure:**
- Docker (containerization)
- Nginx (reverse proxy)
- AWS EC2 (hosting)
- GitHub Actions (CI/CD)

---

## Documentation Updates

### Change Log

**December 2024 - Major Restructure:**
- Created comprehensive API.md
- Updated SDD.md with accurate architecture
- Updated PDD.md with current implementation status
- Removed Caddyfile references (using Nginx)
- Consolidated redundant documentation
- Removed outdated information
- Standardized format (no emojis, concise paragraphs)

### Maintenance

Documentation should be updated when:
- New endpoints are added
- API contracts change
- Architecture decisions are made
- New features are implemented
- Deployment procedures change

---

## Quick Reference

**Need to...**

- Integrate with the API? → [API.md](API.md)
- Understand the codebase? → [SDD.md](SDD.md)
- Learn about features? → [PDD.md](PDD.md)
- Deploy to production? → `/.github/DEPLOYMENT.md`
- Test locally? → `/.github/LOCAL_TESTING.md`
- Setup GitHub? → `/.github/GITHUB_SECRETS_SETUP.md`

---

**Last Updated:** December 2024  
**Documentation Version:** 1.0  
**Status:** Complete and Current

