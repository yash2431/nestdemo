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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const course_schema_1 = require("./schemas/course.schema");
let CoursesService = class CoursesService {
    constructor(courseModel) {
        this.courseModel = courseModel;
    }
    async create(dto) {
        const existing = await this.courseModel
            .findOne({ courseCode: dto.courseCode.toUpperCase() })
            .exec();
        if (existing) {
            throw new common_1.ConflictException(`A course with code '${dto.courseCode.toUpperCase()}' already exists`);
        }
        const course = await this.courseModel.create({
            ...dto,
            courseCode: dto.courseCode.toUpperCase(),
        });
        return {
            message: 'Course created successfully',
            data: course,
        };
    }
    async findAll(query) {
        const filter = {};
        if (query.department) {
            filter.department = { $regex: query.department, $options: 'i' };
        }
        if (query.semester) {
            filter.semester = query.semester;
        }
        if (query.status) {
            filter.status = query.status;
        }
        if (query.availableOnly === 'true') {
            filter.$expr = { $lt: ['$enrolledCount', '$maxCapacity'] };
        }
        const courses = await this.courseModel
            .find(filter)
            .sort({ createdAt: -1 })
            .exec();
        return {
            total: courses.length,
            data: courses,
        };
    }
    async findOne(id) {
        const course = await this.courseModel.findById(id).exec();
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID '${id}' not found`);
        }
        return course;
    }
    async findByCode(courseCode) {
        const course = await this.courseModel
            .findOne({ courseCode: courseCode.toUpperCase() })
            .exec();
        if (!course) {
            throw new common_1.NotFoundException(`Course with code '${courseCode}' not found`);
        }
        return course;
    }
    async update(id, dto) {
        if (dto.courseCode) {
            dto.courseCode = dto.courseCode.toUpperCase();
            const conflict = await this.courseModel
                .findOne({ courseCode: dto.courseCode, _id: { $ne: id } })
                .exec();
            if (conflict) {
                throw new common_1.ConflictException(`Course code '${dto.courseCode}' is already in use`);
            }
        }
        if (dto.maxCapacity !== undefined) {
            const course = await this.findOne(id);
            if (dto.maxCapacity < course.enrolledCount) {
                throw new common_1.BadRequestException(`Cannot set max capacity to ${dto.maxCapacity}. There are already ${course.enrolledCount} students enrolled.`);
            }
        }
        const course = await this.courseModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID '${id}' not found`);
        }
        return {
            message: 'Course updated successfully',
            data: course,
        };
    }
    async remove(id) {
        const course = await this.courseModel.findById(id).exec();
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID '${id}' not found`);
        }
        if (course.enrolledCount > 0) {
            throw new common_1.BadRequestException(`Cannot delete course '${course.title}' as it has ${course.enrolledCount} active enrollments`);
        }
        await course.deleteOne();
        return { message: `Course '${course.title}' deleted successfully` };
    }
    async incrementEnrolledCount(courseId) {
        const course = await this.courseModel
            .findByIdAndUpdate(courseId, { $inc: { enrolledCount: 1 } }, { new: true })
            .exec();
        if (!course)
            throw new common_1.NotFoundException(`Course not found`);
        return course;
    }
    async decrementEnrolledCount(courseId) {
        const course = await this.courseModel
            .findByIdAndUpdate(courseId, { $inc: { enrolledCount: -1 } }, { new: true })
            .exec();
        if (!course)
            throw new common_1.NotFoundException(`Course not found`);
        return course;
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CoursesService);
//# sourceMappingURL=courses.service.js.map