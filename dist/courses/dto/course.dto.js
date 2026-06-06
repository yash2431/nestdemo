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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryCourseDto = exports.UpdateCourseDto = exports.CreateCourseDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const course_schema_1 = require("../schemas/course.schema");
class CreateCourseDto {
}
exports.CreateCourseDto = CreateCourseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CS101', description: 'Unique course code (alphanumeric)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[A-Z0-9]+$/, { message: 'Course code must be alphanumeric uppercase letters and numbers' }),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "courseCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Introduction to Computer Science' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'A foundational course covering programming concepts.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Dr. Alan Turing' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "instructor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, description: 'Credit hours (minimum 1)' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "credits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30, description: 'Maximum enrollment capacity' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "maxCapacity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Computer Science' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01', description: 'Semester/term identifier' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "semester", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Mon/Wed 9:00-10:30 AM' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "schedule", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: course_schema_1.CourseStatus, example: course_schema_1.CourseStatus.ACTIVE }),
    (0, class_validator_1.IsEnum)(course_schema_1.CourseStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "status", void 0);
class UpdateCourseDto extends (0, swagger_1.PartialType)(CreateCourseDto) {
}
exports.UpdateCourseDto = UpdateCourseDto;
class QueryCourseDto {
}
exports.QueryCourseDto = QueryCourseDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Computer Science', description: 'Filter by department' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryCourseDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2024-01', description: 'Filter by semester' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryCourseDto.prototype, "semester", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: course_schema_1.CourseStatus, description: 'Filter by status' }),
    (0, class_validator_1.IsEnum)(course_schema_1.CourseStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryCourseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'false', description: 'Filter only courses with available seats' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryCourseDto.prototype, "availableOnly", void 0);
//# sourceMappingURL=course.dto.js.map