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
exports.StudentSchema = exports.Student = exports.StudentStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
var StudentStatus;
(function (StudentStatus) {
    StudentStatus["ACTIVE"] = "active";
    StudentStatus["INACTIVE"] = "inactive";
    StudentStatus["GRADUATED"] = "graduated";
    StudentStatus["SUSPENDED"] = "suspended";
})(StudentStatus || (exports.StudentStatus = StudentStatus = {}));
let Student = class Student {
};
exports.Student = Student;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'STU-2024-001' }),
    (0, mongoose_1.Prop)({ required: true, unique: true, uppercase: true, trim: true }),
    __metadata("design:type", String)
], Student.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Jane' }),
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Student.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Doe' }),
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Student.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'jane.doe@student.edu' }),
    (0, mongoose_1.Prop)({ required: true, unique: true, lowercase: true, trim: true }),
    __metadata("design:type", String)
], Student.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+91-9876543210' }),
    (0, mongoose_1.Prop)({ trim: true, default: '' }),
    __metadata("design:type", String)
], Student.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2000-05-15' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Student.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Computer Science' }),
    (0, mongoose_1.Prop)({ trim: true, default: 'Undeclared' }),
    __metadata("design:type", String)
], Student.prototype, "major", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2024 }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Student.prototype, "enrollmentYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: StudentStatus, example: StudentStatus.ACTIVE }),
    (0, mongoose_1.Prop)({ type: String, enum: StudentStatus, default: StudentStatus.ACTIVE }),
    __metadata("design:type", String)
], Student.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123 Main St, Pune, Maharashtra' }),
    (0, mongoose_1.Prop)({ trim: true, default: '' }),
    __metadata("design:type", String)
], Student.prototype, "address", void 0);
exports.Student = Student = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'students' })
], Student);
exports.StudentSchema = mongoose_1.SchemaFactory.createForClass(Student);
exports.StudentSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});
exports.StudentSchema.set('toJSON', { virtuals: true });
exports.StudentSchema.set('toObject', { virtuals: true });
//# sourceMappingURL=student.schema.js.map