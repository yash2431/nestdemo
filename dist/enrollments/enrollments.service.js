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
exports.EnrollmentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enrollment_schema_1 = require("./schemas/enrollment.schema");
const courses_service_1 = require("../courses/courses.service");
const students_service_1 = require("../students/students.service");
const course_schema_1 = require("../courses/schemas/course.schema");
const student_schema_1 = require("../students/schemas/student.schema");
let EnrollmentsService = class EnrollmentsService {
    constructor(enrollmentModel, coursesService, studentsService) {
        this.enrollmentModel = enrollmentModel;
        this.coursesService = coursesService;
        this.studentsService = studentsService;
    }
    async enroll(dto) {
        const [student, course] = await Promise.all([
            this.studentsService.findOne(dto.studentId),
            this.coursesService.findOne(dto.courseId),
        ]);
        if (student.status !== student_schema_1.StudentStatus.ACTIVE) {
            throw new common_1.BadRequestException(`Student '${student.firstName} ${student.lastName}' has status '${student.status}' and cannot enroll in courses`);
        }
        if (course.status !== course_schema_1.CourseStatus.ACTIVE) {
            throw new common_1.BadRequestException(`Course '${course.title}' (${course.courseCode}) is not currently active (status: ${course.status})`);
        }
        if (course.enrolledCount >= course.maxCapacity) {
            throw new common_1.ConflictException(`Course '${course.title}' (${course.courseCode}) has reached its maximum capacity of ${course.maxCapacity} students. No seats available.`);
        }
        const existingEnrollment = await this.enrollmentModel
            .findOne({
            student: new mongoose_2.Types.ObjectId(dto.studentId),
            course: new mongoose_2.Types.ObjectId(dto.courseId),
        })
            .exec();
        if (existingEnrollment) {
            if (existingEnrollment.status === enrollment_schema_1.EnrollmentStatus.ACTIVE) {
                throw new common_1.ConflictException(`Student '${student.firstName} ${student.lastName}' is already enrolled in '${course.title}' (${course.courseCode})`);
            }
            if (existingEnrollment.status === enrollment_schema_1.EnrollmentStatus.DROPPED) {
                existingEnrollment.status = enrollment_schema_1.EnrollmentStatus.ACTIVE;
                existingEnrollment.enrolledAt = new Date();
                existingEnrollment.remarks = dto.remarks || '';
                await existingEnrollment.save();
                await this.coursesService.incrementEnrolledCount(dto.courseId);
                const populated = await existingEnrollment.populate(['student', 'course']);
                return {
                    message: `Student successfully re-enrolled in '${course.title}'`,
                    data: populated,
                };
            }
            if (existingEnrollment.status === enrollment_schema_1.EnrollmentStatus.COMPLETED) {
                throw new common_1.ConflictException(`Student '${student.firstName} ${student.lastName}' has already completed the course '${course.title}'. Cannot re-enroll in a completed course.`);
            }
        }
        const enrollment = await this.enrollmentModel.create({
            student: new mongoose_2.Types.ObjectId(dto.studentId),
            course: new mongoose_2.Types.ObjectId(dto.courseId),
            remarks: dto.remarks || '',
        });
        await this.coursesService.incrementEnrolledCount(dto.courseId);
        const populated = await enrollment.populate(['student', 'course']);
        const remaining = course.maxCapacity - course.enrolledCount - 1;
        return {
            message: `Student '${student.firstName} ${student.lastName}' successfully enrolled in '${course.title}'`,
            seatsRemaining: remaining,
            data: populated,
        };
    }
    async findAll(query) {
        const filter = {};
        if (query.studentId) {
            filter.student = new mongoose_2.Types.ObjectId(query.studentId);
        }
        if (query.courseId) {
            filter.course = new mongoose_2.Types.ObjectId(query.courseId);
        }
        if (query.status) {
            filter.status = query.status;
        }
        const enrollments = await this.enrollmentModel
            .find(filter)
            .populate('student', 'studentId firstName lastName email major')
            .populate('course', 'courseCode title instructor credits semester')
            .sort({ enrolledAt: -1 })
            .exec();
        return {
            total: enrollments.length,
            data: enrollments,
        };
    }
    async findOne(id) {
        const enrollment = await this.enrollmentModel
            .findById(id)
            .populate('student')
            .populate('course')
            .exec();
        if (!enrollment) {
            throw new common_1.NotFoundException(`Enrollment with ID '${id}' not found`);
        }
        return enrollment;
    }
    async getStudentEnrollments(studentId) {
        await this.studentsService.findOne(studentId);
        const enrollments = await this.enrollmentModel
            .find({ student: new mongoose_2.Types.ObjectId(studentId) })
            .populate('course', 'courseCode title instructor credits semester status schedule')
            .sort({ enrolledAt: -1 })
            .exec();
        return {
            total: enrollments.length,
            data: enrollments,
        };
    }
    async getCourseEnrollments(courseId) {
        await this.coursesService.findOne(courseId);
        const enrollments = await this.enrollmentModel
            .find({ course: new mongoose_2.Types.ObjectId(courseId), status: enrollment_schema_1.EnrollmentStatus.ACTIVE })
            .populate('student', 'studentId firstName lastName email major enrollmentYear')
            .sort({ enrolledAt: -1 })
            .exec();
        return {
            total: enrollments.length,
            data: enrollments,
        };
    }
    async update(id, dto) {
        const enrollment = await this.enrollmentModel.findById(id).exec();
        if (!enrollment) {
            throw new common_1.NotFoundException(`Enrollment with ID '${id}' not found`);
        }
        if (dto.status === enrollment_schema_1.EnrollmentStatus.DROPPED &&
            enrollment.status === enrollment_schema_1.EnrollmentStatus.ACTIVE) {
            await this.coursesService.decrementEnrolledCount(enrollment.course.toString());
        }
        if (dto.status === enrollment_schema_1.EnrollmentStatus.ACTIVE &&
            enrollment.status === enrollment_schema_1.EnrollmentStatus.DROPPED) {
            const course = await this.coursesService.findOne(enrollment.course.toString());
            if (course.enrolledCount >= course.maxCapacity) {
                throw new common_1.ConflictException(`Cannot re-activate enrollment: course '${course.title}' is at full capacity`);
            }
            await this.coursesService.incrementEnrolledCount(enrollment.course.toString());
        }
        const updated = await this.enrollmentModel
            .findByIdAndUpdate(id, dto, { new: true })
            .populate('student', 'studentId firstName lastName email')
            .populate('course', 'courseCode title instructor')
            .exec();
        return {
            message: 'Enrollment updated successfully',
            data: updated,
        };
    }
    async drop(id) {
        const enrollment = await this.enrollmentModel.findById(id).exec();
        if (!enrollment) {
            throw new common_1.NotFoundException(`Enrollment with ID '${id}' not found`);
        }
        if (enrollment.status !== enrollment_schema_1.EnrollmentStatus.ACTIVE) {
            throw new common_1.BadRequestException(`Cannot drop enrollment with status '${enrollment.status}'. Only ACTIVE enrollments can be dropped.`);
        }
        enrollment.status = enrollment_schema_1.EnrollmentStatus.DROPPED;
        await enrollment.save();
        await this.coursesService.decrementEnrolledCount(enrollment.course.toString());
        return { message: 'Enrollment dropped successfully' };
    }
};
exports.EnrollmentsService = EnrollmentsService;
exports.EnrollmentsService = EnrollmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(enrollment_schema_1.Enrollment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        courses_service_1.CoursesService,
        students_service_1.StudentsService])
], EnrollmentsService);
//# sourceMappingURL=enrollments.service.js.map