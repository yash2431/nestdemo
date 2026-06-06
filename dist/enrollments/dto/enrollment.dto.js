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
exports.QueryEnrollmentDto = exports.UpdateEnrollmentDto = exports.CreateEnrollmentDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const enrollment_schema_1 = require("../schemas/enrollment.schema");
class CreateEnrollmentDto {
}
exports.CreateEnrollmentDto = CreateEnrollmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '665f1a2b3c4d5e6f7a8b9c0d',
        description: 'MongoDB ObjectId of the student',
    }),
    (0, class_validator_1.IsMongoId)({ message: 'studentId must be a valid MongoDB ObjectId' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateEnrollmentDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '665f1a2b3c4d5e6f7a8b9c0e',
        description: 'MongoDB ObjectId of the course',
    }),
    (0, class_validator_1.IsMongoId)({ message: 'courseId must be a valid MongoDB ObjectId' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateEnrollmentDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Walk-in enrollment' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEnrollmentDto.prototype, "remarks", void 0);
class UpdateEnrollmentDto {
}
exports.UpdateEnrollmentDto = UpdateEnrollmentDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: enrollment_schema_1.EnrollmentStatus,
        example: enrollment_schema_1.EnrollmentStatus.DROPPED,
        description: 'Update enrollment status',
    }),
    (0, class_validator_1.IsEnum)(enrollment_schema_1.EnrollmentStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEnrollmentDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: enrollment_schema_1.Grade,
        example: enrollment_schema_1.Grade.A,
        description: 'Assign a grade to the student',
    }),
    (0, class_validator_1.IsEnum)(enrollment_schema_1.Grade),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEnrollmentDto.prototype, "grade", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Updated remarks' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEnrollmentDto.prototype, "remarks", void 0);
class QueryEnrollmentDto {
}
exports.QueryEnrollmentDto = QueryEnrollmentDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by student MongoDB ObjectId' }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryEnrollmentDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by course MongoDB ObjectId' }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryEnrollmentDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enrollment_schema_1.EnrollmentStatus }),
    (0, class_validator_1.IsEnum)(enrollment_schema_1.EnrollmentStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryEnrollmentDto.prototype, "status", void 0);
//# sourceMappingURL=enrollment.dto.js.map