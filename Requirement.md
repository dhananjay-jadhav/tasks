# Functional Requirements: Task Management Platform

## 1. Overview
A backend application for users to manage personal and work-related tasks. The platform supports full CRUD operations on tasks and projects, user authentication, robust error handling, integration with a third-party API (e.g., Google Calendar for deadlines or a public holidays API), security best practices, performance monitoring, and containerized deployment.

---

## 2. User Management and Authentication

**2.1 User Registration**
- Users can register using a unique email and secure password.
- Email format validated; passwords hashed before database storage.

**2.2 User Login & JWT**
- Users can log in to receive JWT access/refresh tokens.
- All protected endpoints require valid JWT (auth guard).

**2.3 Password Reset**
- Users can request a password reset (token-based, can be simulated for demo).
- Link/token expiry managed securely.

**2.4 User Profile**
- Users can retrieve/update their profile (e.g., display name, avatar, timezone).

---

## 3. Project Management

**3.1 CRUD Operations**
- Users can create, retrieve (list/detail), update, and delete Projects.
- Each Project includes: name, color (label), description, creation date, owner.
- Users can only manage their own projects.
- Input validation for all fields.

---

## 4. Task Management

**4.1 CRUD Operations**
- Users can create, retrieve (list/detail), update, and delete Tasks.
- Each Task has: title, description, due date, priority, status (To Do, In Progress, Done), tags, project reference, creation/update date.
- Tasks belong to a user and optionally to a project.
- Users can only access/modify their own tasks.

**4.2 Task Listing and Filtering**
- Tasks listing supports pagination, sorting (by due date, priority/status), and filtering (by project, status, overdue).
- Search/filter by text in title/description.

**4.3 Task Comments/Notes**
- Users can add/edit/remove comments or notes on their own tasks.
- Each comment: text, timestamp, author (single-user context).

---

## 5. External API Integration

**5.1 Calendar Sync Example**
- Users may link a public holidays API, Google Calendar, or similar (external API choice configurable).
  - For each task with a due date, show if the date falls on a holiday (use public API).
  - Optionally, push upcoming tasks as calendar events via external API (if available).
- Errors from external API must not break app flow; error logs and retry logic implemented.

---

## 6. Notifications (Optional but Recommended)

- Support for email/push notification integration can be stubbed or simulated (e.g., task due/overdue reminders).

---

## 7. Security & Auth

- All passwords stored securely (bcrypt/argon2).
- Sensitive endpoints require authentication.
- Input sanitation & validation on every endpoint.
- Rate limiting on login & sensitive endpoints.
- JWT tokens signed with environment-secret, refresh logic implemented.

---

## 8. Error Handling & Logging

- Centralized global exception filter.
- All errors logged with timestamp and context.
- User-facing errors are clear, never expose stack traces or sensitive info.

---

## 9. Performance Monitoring

- Request/response times logged (NestJS logger, Prometheus integration optional).
- `/health` endpoint for uptime checks.
- Error rate and slow query logging.

---

## 10. Dockerization & Config

- Multi-stage Dockerfile for app build and runtime.
- Docker Compose support with DB (Postgres recommended).
- Configuration via environment variables; sample .env file provided.

---

## 11. API Documentation

- Swagger/OpenAPI endpoint auto-generated.
- Example payloads and error responses documented.

---

## 12. Automated Testing

- Unit tests for services/utilities.
- E2E tests for main API flows (auth, task/project/task comment CRUD, external API integration).

---

## 13. Advanced/Bonus (Optional for Portfolio Enhancement)

- **Task Recurrence:** Tasks that repeat on a schedule.
- **Role-Based Access:** e.g., “shared tasks” with other users (with proper permissions model).
- **Dashboard/Statistics Endpoint:** Chart of tasks by status, overdue, per project, etc.
- **Attach Files/Links to Tasks:** File upload feature (can be mocked for demo).

---

## 14. Out of Scope

- No client (frontend) beyond Swagger docs and tests.
- No real-time collaboration (e.g., websockets).

---

**This document covers all must-have and extendable features expected in a modern, production-ready task management backend.**
