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
exports.EnrollmentSchema = exports.Enrollment = exports.Grade = exports.EnrollmentStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
var EnrollmentStatus;
(function (EnrollmentStatus) {
    EnrollmentStatus["ACTIVE"] = "active";
    EnrollmentStatus["DROPPED"] = "dropped";
    EnrollmentStatus["COMPLETED"] = "completed";
    EnrollmentStatus["WAITLISTED"] = "waitlisted";
})(EnrollmentStatus || (exports.EnrollmentStatus = EnrollmentStatus = {}));
var Grade;
(function (Grade) {
    Grade["A_PLUS"] = "A+";
    Grade["A"] = "A";
    Grade["A_MINUS"] = "A-";
    Grade["B_PLUS"] = "B+";
    Grade["B"] = "B";
    Grade["B_MINUS"] = "B-";
    Grade["C_PLUS"] = "C+";
    Grade["C"] = "C";
    Grade["C_MINUS"] = "C-";
    Grade["D"] = "D";
    Grade["F"] = "F";
    Grade["INCOMPLETE"] = "I";
    Grade["WITHDRAWN"] = "W";
    Grade["NOT_GRADED"] = "NG";
})(Grade || (exports.Grade = Grade = {}));
let Enrollment = class Enrollment {
};
exports.Enrollment = Enrollment;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Student MongoDB ObjectId reference' }),
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        index: true,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Enrollment.prototype, "student", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Course MongoDB ObjectId reference' }),
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
        index: true,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Enrollment.prototype, "course", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: EnrollmentStatus, example: EnrollmentStatus.ACTIVE }),
    (0, mongoose_1.Prop)({
        type: String,
        enum: EnrollmentStatus,
        default: EnrollmentStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], Enrollment.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15T00:00:00.000Z' }),
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Enrollment.prototype, "enrolledAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: Grade, example: Grade.NOT_GRADED, required: false }),
    (0, mongoose_1.Prop)({ type: String, enum: Grade, default: Grade.NOT_GRADED }),
    __metadata("design:type", String)
], Enrollment.prototype, "grade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Student enrolled via walk-in', required: false }),
    (0, mongoose_1.Prop)({ trim: true, default: '' }),
    __metadata("design:type", String)
], Enrollment.prototype, "remarks", void 0);
exports.Enrollment = Enrollment = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'enrollments' })
], Enrollment);
exports.EnrollmentSchema = mongoose_1.SchemaFactory.createForClass(Enrollment);
exports.EnrollmentSchema.index({ student: 1, course: 1 }, { unique: true });
//# sourceMappingURL=enrollment.schema.js.map