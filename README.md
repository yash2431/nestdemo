# 🎓 College Course Enrollment API

A production-ready RESTful API for a **College Course Enrollment System**, built with **NestJS**, **MongoDB (Mongoose)**, and **JWT authentication**.

---

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Business Logic Safeguards](#business-logic-safeguards)
- [Swagger UI](#swagger-ui)
- [Database Schema Design](#database-schema-design)

---

## 🛠 Tech Stack

| Layer         | Technology                      |
|---------------|---------------------------------|
| Framework     | NestJS (TypeScript)             |
| Database      | MongoDB via Mongoose            |
| Auth          | JWT (Passport.js)               |
| Validation    | class-validator + class-transformer |
| Documentation | @nestjs/swagger (Swagger UI)    |
| Password Hash | bcryptjs (12 rounds)            |

---

## 🏗 Architecture

```
src/
├── main.ts                        # Bootstrap + Swagger config
├── app.module.ts                  # Root module
├── auth/
│   ├── auth.module.ts             # JWT module setup, global guard registration
│   └── jwt.strategy.ts            # Passport JWT strategy
├── common/
│   ├── guards/jwt-auth.guard.ts   # Global JWT guard with @Public() bypass
│   └── decorators/
│       ├── public.decorator.ts    # @Public() — marks routes as open
│       └── current-user.decorator.ts
├── admin/
│   ├── schemas/admin.schema.ts    # Admin Mongoose schema
│   ├── dto/admin.dto.ts           # RegisterAdminDto, LoginAdminDto, UpdateAdminDto
│   ├── admin.service.ts
│   ├── admin.controller.ts
│   └── admin.module.ts
├── courses/
│   ├── schemas/course.schema.ts   # Course schema with virtuals
│   ├── dto/course.dto.ts
│   ├── courses.service.ts
│   ├── courses.controller.ts
│   └── courses.module.ts
├── students/
│   ├── schemas/student.schema.ts
│   ├── dto/student.dto.ts
│   ├── students.service.ts
│   ├── students.controller.ts
│   └── students.module.ts
└── enrollments/
    ├── schemas/enrollment.schema.ts  # Compound unique index on (student, course)
    ├── dto/enrollment.dto.ts
    ├── enrollments.service.ts        # Core business logic
    ├── enrollments.controller.ts
    └── enrollments.module.ts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.x
- MongoDB running locally or a MongoDB Atlas URI

### Installation

```bash
# Clone/unzip the project
cd college-enrollment-api

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Run in development mode
npm run start:dev

# Run in production mode
npm run build && npm run start:prod
```

The server starts at **http://localhost:3000**  
Swagger UI is at **http://localhost:3000/api**

---

## 🔧 Environment Variables

| Variable       | Description                        | Default                                        |
|----------------|------------------------------------|------------------------------------------------|
| `MONGODB_URI`  | MongoDB connection string          | `mongodb://localhost:27017/college_enrollment` |
| `JWT_SECRET`   | Secret key for signing JWT tokens  | `default-secret-change-me`                     |
| `JWT_EXPIRES_IN` | Token expiry duration            | `7d`                                           |
| `PORT`         | Server port                        | `3000`                                         |

---

## 📡 API Overview

### Authentication

All routes are **protected by JWT** globally via `JwtAuthGuard`.  
Routes marked with `@Public()` are open without a token.

| Method | Endpoint          | Auth | Description                    |
|--------|-------------------|------|--------------------------------|
| POST   | /admin/register   | ❌   | Create admin (returns token)   |
| POST   | /admin/login      | ❌   | Login (returns token)          |
| GET    | /admin/profile    | ✅   | Get current admin profile      |
| GET    | /admin            | ✅   | List all admins                |
| GET    | /admin/:id        | ✅   | Get admin by ID                |
| PATCH  | /admin/:id        | ✅   | Update admin                   |
| DELETE | /admin/:id        | ✅   | Deactivate admin               |

### Courses

| Method | Endpoint       | Auth | Description               |
|--------|----------------|------|---------------------------|
| POST   | /courses       | ✅   | Create course             |
| GET    | /courses       | ❌   | List courses (w/ filters) |
| GET    | /courses/:id   | ❌   | Get course details        |
| PATCH  | /courses/:id   | ✅   | Update course             |
| DELETE | /courses/:id   | ✅   | Delete course             |

### Students

| Method | Endpoint        | Auth | Description                 |
|--------|-----------------|------|-----------------------------|
| POST   | /students       | ❌   | Register student            |
| GET    | /students       | ✅   | List students (w/ filters)  |
| GET    | /students/:id   | ✅   | Get student by ID           |
| PATCH  | /students/:id   | ✅   | Update student              |
| DELETE | /students/:id   | ✅   | Remove student              |

### Enrollments

| Method | Endpoint                        | Auth | Description                    |
|--------|---------------------------------|------|--------------------------------|
| POST   | /enrollments                    | ❌   | Enroll student in course       |
| GET    | /enrollments                    | ✅   | List enrollments (w/ filters)  |
| GET    | /enrollments/:id                | ✅   | Get enrollment details         |
| GET    | /enrollments/student/:studentId | ❌   | Student's course history       |
| GET    | /enrollments/course/:courseId   | ✅   | Students in a course           |
| PATCH  | /enrollments/:id                | ✅   | Update status/grade            |
| DELETE | /enrollments/:id                | ✅   | Drop an enrollment             |

---

## 🛡 Business Logic Safeguards

### Enrollment Engine (`POST /enrollments`)

The enrollment service enforces the following rules in order:

1. **Student existence check** — 404 if student not found  
2. **Course existence check** — 404 if course not found  
3. **Student status check** — 400 if student is not `active`  
4. **Course status check** — 400 if course is not `active`  
5. **Capacity check** — 409 if `enrolledCount >= maxCapacity`  
6. **Duplicate enrollment check** — 409 if student already has an ACTIVE enrollment in the same course  
7. **Re-enrollment logic** — allows re-enrollment if status is `dropped` (capacity re-checked)  
8. **Completed course guard** — 409 if student already completed this course  

Additionally, a **compound unique index** `{ student: 1, course: 1 }` on the enrollments collection provides a database-level safeguard against race conditions.

---

## 📖 Swagger UI

Navigate to `http://localhost:3000/api` after starting the server.

**To test protected endpoints:**
1. Call `POST /admin/register` or `POST /admin/login`
2. Copy the `access_token` from the response
3. Click the **Authorize 🔒** button at the top right
4. Enter: `Bearer <your_token>`
5. All protected endpoints are now unlocked

---

## 🗃 Database Schema Design

### Admin
- `name`, `email` (unique), `password` (hashed), `role` (admin/super_admin), `isActive`

### Course
- `courseCode` (unique), `title`, `description`, `instructor`, `credits`
- `maxCapacity`, `enrolledCount` (auto-managed), `department`, `semester`
- `schedule`, `status` (active/inactive/completed)
- **Virtuals**: `availableSeats`, `isFull`

### Student
- `studentId` (unique), `firstName`, `lastName`, `email` (unique)
- `phone`, `dateOfBirth`, `major`, `enrollmentYear`, `status`, `address`
- **Virtual**: `fullName`

### Enrollment
- `student` (ref → Student), `course` (ref → Course)
- `status` (active/dropped/completed/waitlisted), `enrolledAt`, `grade`, `remarks`
- **Index**: Compound unique on `{ student, course }` — prevents DB-level duplicates

---

## 🧪 Quick Test Flow

```bash
# 1. Register admin
POST /admin/register
{ "name": "Admin", "email": "admin@college.edu", "password": "Admin@1234" }

# 2. Login and copy access_token
POST /admin/login
{ "email": "admin@college.edu", "password": "Admin@1234" }

# 3. Create a course (use token in Authorization header)
POST /courses
{ "courseCode": "CS101", "title": "Intro to CS", "instructor": "Dr. Turing",
  "credits": 3, "maxCapacity": 2, "semester": "2024-01" }

# 4. Register students
POST /students
{ "studentId": "STU-001", "firstName": "Alice", "lastName": "Smith",
  "email": "alice@student.edu", "dateOfBirth": "2000-01-15", "enrollmentYear": 2024 }

# 5. Enroll student
POST /enrollments
{ "studentId": "<alice_id>", "courseId": "<course_id>" }

# 6. Try to enroll again → 409 Duplicate Enrollment
# 7. Fill up capacity → 409 Course at Capacity
```
