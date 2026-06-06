"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const enrollments_service_1 = require("./enrollments.service");
const enrollment_dto_1 = require("./dto/enrollment.dto");
const public_decorator_1 = require("../common/decorators/public.decorator");
let EnrollmentsController = class EnrollmentsController {
    constructor(enrollmentsService) {
        this.enrollmentsService = enrollmentsService;
    }
    enroll(dto) {
        return this.enrollmentsService.enroll(dto);
    }
    findAll(query) {
        return this.enrollmentsService.findAll(query);
    }
    findOne(id) {
        return this.enrollmentsService.findOne(id);
    }
    getStudentEnrollments(studentId) {
        return this.enrollmentsService.getStudentEnrollments(studentId);
    }
    getCourseEnrollments(courseId) {
        return this.enrollmentsService.getCourseEnrollments(courseId);
    }
    update(id, dto) {
        return this.enrollmentsService.update(id, dto);
    }
    drop(id) {
        return this.enrollmentsService.drop(id);
    }
};
exports.EnrollmentsController = EnrollmentsController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Enroll a student in a course',
        description: `
**Core enrollment engine.** Enrolls a student into a course with the following safeguards:

- ❌ **Duplicate Check**: A student cannot enroll in the same course twice (active enrollment).
- ❌ **Capacity Check**: Enrollment fails if the course has reached its \`maxCapacity\`.
- ❌ **Status Check**: Student must be \`active\` and course must be \`active\`.
- ✅ **Re-enrollment**: A student who dropped a course can re-enroll (if capacity allows).
    `,
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Enrollment successful' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Student or course is not active' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Student or course not found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Duplicate enrollment OR course at capacity' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [enrollment_dto_1.CreateEnrollmentDto]),
    __metadata("design:returntype", void 0)
], EnrollmentsController.prototype, "enroll", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'List all enrollments',
        description: '**Requires admin authentication.** Filter by student, course, or status.',
    }),
    (0, swagger_1.ApiQuery)({ name: 'studentId', required: false, description: 'Filter by student ObjectId' }),
    (0, swagger_1.ApiQuery)({ name: 'courseId', required: false, description: 'Filter by course ObjectId' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['active', 'dropped', 'completed', 'waitlisted'] }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of enrollments with populated student & course data' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [enrollment_dto_1.QueryEnrollmentDto]),
    __metadata("design:returntype", void 0)
], EnrollmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get enrollment by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Enrollment MongoDB ObjectId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Enrollment details with student and course data' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Enrollment not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EnrollmentsController.prototype, "findOne", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('student/:studentId'),
    (0, swagger_1.ApiOperation)({
        summary: "Get a student's enrollments",
        description: "Returns all enrollments for a specific student with populated course info.",
    }),
    (0, swagger_1.ApiParam)({ name: 'studentId', description: 'Student MongoDB ObjectId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Student's enrollment history" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Student not found' }),
    __param(0, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EnrollmentsController.prototype, "getStudentEnrollments", null);
__decorate([
    (0, common_1.Get)('course/:courseId'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all students enrolled in a course',
        description: '**Requires admin authentication.** Returns all active enrollments for a course.',
    }),
    (0, swagger_1.ApiParam)({ name: 'courseId', description: 'Course MongoDB ObjectId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of enrolled students' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Course not found' }),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EnrollmentsController.prototype, "getCourseEnrollments", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update enrollment status or grade',
        description: '**Requires admin authentication.** Update status (active/dropped/completed) or assign a grade.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Enrollment MongoDB ObjectId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Enrollment updated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Enrollment not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, enrollment_dto_1.UpdateEnrollmentDto]),
    __metadata("design:returntype", void 0)
], EnrollmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Drop an enrollment',
        description: '**Requires admin authentication.** Changes status to DROPPED and frees up a seat.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Enrollment MongoDB ObjectId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Enrollment dropped successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Enrollment is not active' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Enrollment not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EnrollmentsController.prototype, "drop", null);
exports.EnrollmentsController = EnrollmentsController = __decorate([
    (0, swagger_1.ApiTags)('Enrollments'),
    (0, common_1.Controller)('enrollments'),
    __metadata("design:paramtypes", [enrollments_service_1.EnrollmentsService])
], EnrollmentsController);
//# sourceMappingURL=enrollments.controller.js.map