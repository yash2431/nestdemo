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
exports.CourseSchema = exports.Course = exports.CourseStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
var CourseStatus;
(function (CourseStatus) {
    CourseStatus["ACTIVE"] = "active";
    CourseStatus["INACTIVE"] = "inactive";
    CourseStatus["COMPLETED"] = "completed";
})(CourseStatus || (exports.CourseStatus = CourseStatus = {}));
let Course = class Course {
};
exports.Course = Course;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CS101' }),
    (0, mongoose_1.Prop)({ required: true, unique: true, uppercase: true, trim: true }),
    __metadata("design:type", String)
], Course.prototype, "courseCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Introduction to Computer Science' }),
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A foundational course covering programming concepts.' }),
    (0, mongoose_1.Prop)({ trim: true, default: '' }),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Dr. Alan Turing' }),
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Course.prototype, "instructor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    (0, mongoose_1.Prop)({ required: true, min: 1 }),
    __metadata("design:type", Number)
], Course.prototype, "credits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30, description: 'Maximum number of students allowed' }),
    (0, mongoose_1.Prop)({ required: true, min: 1 }),
    __metadata("design:type", Number)
], Course.prototype, "maxCapacity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, description: 'Current enrolled student count' }),
    (0, mongoose_1.Prop)({ default: 0, min: 0 }),
    __metadata("design:type", Number)
], Course.prototype, "enrolledCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Computer Science' }),
    (0, mongoose_1.Prop)({ trim: true, default: 'General' }),
    __metadata("design:type", String)
], Course.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01', description: 'Academic semester/term' }),
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Course.prototype, "semester", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Mon/Wed 9:00-10:30 AM' }),
    (0, mongoose_1.Prop)({ trim: true, default: '' }),
    __metadata("design:type", String)
], Course.prototype, "schedule", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: CourseStatus, example: CourseStatus.ACTIVE }),
    (0, mongoose_1.Prop)({ type: String, enum: CourseStatus, default: CourseStatus.ACTIVE }),
    __metadata("design:type", String)
], Course.prototype, "status", void 0);
exports.Course = Course = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'courses' })
], Course);
exports.CourseSchema = mongoose_1.SchemaFactory.createForClass(Course);
exports.CourseSchema.virtual('availableSeats').get(function () {
    return this.maxCapacity - this.enrolledCount;
});
exports.CourseSchema.virtual('isFull').get(function () {
    return this.enrolledCount >= this.maxCapacity;
});
exports.CourseSchema.set('toJSON', { virtuals: true });
exports.CourseSchema.set('toObject', { virtuals: true });
//# sourceMappingURL=course.schema.js.map