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
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const student_schema_1 = require("./schemas/student.schema");
let StudentsService = class StudentsService {
    constructor(studentModel) {
        this.studentModel = studentModel;
    }
    async create(dto) {
        const existingById = await this.studentModel
            .findOne({ studentId: dto.studentId.toUpperCase() })
            .exec();
        if (existingById) {
            throw new common_1.ConflictException(`Student with ID '${dto.studentId}' already exists`);
        }
        const existingByEmail = await this.studentModel
            .findOne({ email: dto.email.toLowerCase() })
            .exec();
        if (existingByEmail) {
            throw new common_1.ConflictException(`A student with email '${dto.email}' is already registered`);
        }
        const student = await this.studentModel.create({
            ...dto,
            studentId: dto.studentId.toUpperCase(),
        });
        return {
            message: 'Student registered successfully',
            data: student,
        };
    }
    async findAll(query) {
        const filter = {};
        if (query.major) {
            filter.major = { $regex: query.major, $options: 'i' };
        }
        if (query.status) {
            filter.status = query.status;
        }
        if (query.enrollmentYear) {
            filter.enrollmentYear = Number(query.enrollmentYear);
        }
        const students = await this.studentModel
            .find(filter)
            .sort({ createdAt: -1 })
            .exec();
        return {
            total: students.length,
            data: students,
        };
    }
    async findOne(id) {
        const student = await this.studentModel.findById(id).exec();
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID '${id}' not found`);
        }
        return student;
    }
    async findByStudentId(studentId) {
        const student = await this.studentModel
            .findOne({ studentId: studentId.toUpperCase() })
            .exec();
        if (!student) {
            throw new common_1.NotFoundException(`Student with student ID '${studentId}' not found`);
        }
        return student;
    }
    async update(id, dto) {
        if (dto.studentId) {
            const conflict = await this.studentModel
                .findOne({ studentId: dto.studentId.toUpperCase(), _id: { $ne: id } })
                .exec();
            if (conflict) {
                throw new common_1.ConflictException(`Student ID '${dto.studentId}' is already in use`);
            }
            dto.studentId = dto.studentId.toUpperCase();
        }
        if (dto.email) {
            const conflict = await this.studentModel
                .findOne({ email: dto.email.toLowerCase(), _id: { $ne: id } })
                .exec();
            if (conflict) {
                throw new common_1.ConflictException(`Email '${dto.email}' is already in use`);
            }
        }
        const student = await this.studentModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID '${id}' not found`);
        }
        return {
            message: 'Student updated successfully',
            data: student,
        };
    }
    async remove(id) {
        const student = await this.studentModel.findByIdAndDelete(id).exec();
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID '${id}' not found`);
        }
        return {
            message: `Student '${student.firstName} ${student.lastName}' removed successfully`,
        };
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(student_schema_1.Student.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], StudentsService);
//# sourceMappingURL=students.service.js.map