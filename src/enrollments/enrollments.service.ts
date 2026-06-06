import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Enrollment, EnrollmentDocument, EnrollmentStatus } from './schemas/enrollment.schema';
import { CreateEnrollmentDto, UpdateEnrollmentDto, QueryEnrollmentDto } from './dto/enrollment.dto';
import { CoursesService } from '../courses/courses.service';
import { StudentsService } from '../students/students.service';
import { CourseStatus } from '../courses/schemas/course.schema';
import { StudentStatus } from '../students/schemas/student.schema';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectModel(Enrollment.name)
    private readonly enrollmentModel: Model<EnrollmentDocument>,
    private readonly coursesService: CoursesService,
    private readonly studentsService: StudentsService,
  ) {}

  async enroll(dto: CreateEnrollmentDto) {
    const [student, course] = await Promise.all([
      this.studentsService.findOne(dto.studentId),
      this.coursesService.findOne(dto.courseId),
    ]);

    // ── Guard 1: Student must be active ──────────────────────────────────────
    if (student.status !== StudentStatus.ACTIVE) {
      throw new BadRequestException(
        `Student '${student.firstName} ${student.lastName}' has status '${student.status}' and cannot enroll in courses`,
      );
    }

    // ── Guard 2: Course must be active ───────────────────────────────────────
    if (course.status !== CourseStatus.ACTIVE) {
      throw new BadRequestException(
        `Course '${course.title}' (${course.courseCode}) is not currently active (status: ${course.status})`,
      );
    }

    // ── Guard 3: Capacity check ───────────────────────────────────────────────
    if (course.enrolledCount >= course.maxCapacity) {
      throw new ConflictException(
        `Course '${course.title}' (${course.courseCode}) has reached its maximum capacity of ${course.maxCapacity} students. No seats available.`,
      );
    }

    // ── Guard 4: Duplicate enrollment check ──────────────────────────────────
    const existingEnrollment = await this.enrollmentModel
      .findOne({
        student: new Types.ObjectId(dto.studentId),
        course: new Types.ObjectId(dto.courseId),
      })
      .exec();

    if (existingEnrollment) {
      if (existingEnrollment.status === EnrollmentStatus.ACTIVE) {
        throw new ConflictException(
          `Student '${student.firstName} ${student.lastName}' is already enrolled in '${course.title}' (${course.courseCode})`,
        );
      }

      if (existingEnrollment.status === EnrollmentStatus.DROPPED) {
        // Allow re-enrollment by updating the existing record
        existingEnrollment.status = EnrollmentStatus.ACTIVE;
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

      if (existingEnrollment.status === EnrollmentStatus.COMPLETED) {
        throw new ConflictException(
          `Student '${student.firstName} ${student.lastName}' has already completed the course '${course.title}'. Cannot re-enroll in a completed course.`,
        );
      }
    }

    // ── Create enrollment ────────────────────────────────────────────────────
    const enrollment = await this.enrollmentModel.create({
      student: new Types.ObjectId(dto.studentId),
      course: new Types.ObjectId(dto.courseId),
      remarks: dto.remarks || '',
    });

    // Increment course enrolled count
    await this.coursesService.incrementEnrolledCount(dto.courseId);

    const populated = await enrollment.populate(['student', 'course']);

    const remaining = course.maxCapacity - course.enrolledCount - 1;
    return {
      message: `Student '${student.firstName} ${student.lastName}' successfully enrolled in '${course.title}'`,
      seatsRemaining: remaining,
      data: populated,
    };
  }

  async findAll(query: QueryEnrollmentDto) {
    const filter: any = {};

    if (query.studentId) {
      filter.student = new Types.ObjectId(query.studentId);
    }
    if (query.courseId) {
      filter.course = new Types.ObjectId(query.courseId);
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

  async findOne(id: string) {
    const enrollment = await this.enrollmentModel
      .findById(id)
      .populate('student')
      .populate('course')
      .exec();

    if (!enrollment) {
      throw new NotFoundException(`Enrollment with ID '${id}' not found`);
    }
    return enrollment;
  }

  async getStudentEnrollments(studentId: string) {
    // Validate student exists
    await this.studentsService.findOne(studentId);

    const enrollments = await this.enrollmentModel
      .find({ student: new Types.ObjectId(studentId) })
      .populate('course', 'courseCode title instructor credits semester status schedule')
      .sort({ enrolledAt: -1 })
      .exec();

    return {
      total: enrollments.length,
      data: enrollments,
    };
  }

  async getCourseEnrollments(courseId: string) {
    // Validate course exists
    await this.coursesService.findOne(courseId);

    const enrollments = await this.enrollmentModel
      .find({ course: new Types.ObjectId(courseId), status: EnrollmentStatus.ACTIVE })
      .populate('student', 'studentId firstName lastName email major enrollmentYear')
      .sort({ enrolledAt: -1 })
      .exec();

    return {
      total: enrollments.length,
      data: enrollments,
    };
  }

  async update(id: string, dto: UpdateEnrollmentDto) {
    const enrollment = await this.enrollmentModel.findById(id).exec();
    if (!enrollment) {
      throw new NotFoundException(`Enrollment with ID '${id}' not found`);
    }

    // When dropping, decrement count
    if (
      dto.status === EnrollmentStatus.DROPPED &&
      enrollment.status === EnrollmentStatus.ACTIVE
    ) {
      await this.coursesService.decrementEnrolledCount(
        enrollment.course.toString(),
      );
    }

    // When re-activating from dropped, increment count and check capacity
    if (
      dto.status === EnrollmentStatus.ACTIVE &&
      enrollment.status === EnrollmentStatus.DROPPED
    ) {
      const course = await this.coursesService.findOne(
        enrollment.course.toString(),
      );
      if (course.enrolledCount >= course.maxCapacity) {
        throw new ConflictException(
          `Cannot re-activate enrollment: course '${course.title}' is at full capacity`,
        );
      }
      await this.coursesService.incrementEnrolledCount(
        enrollment.course.toString(),
      );
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

  async drop(id: string) {
    const enrollment = await this.enrollmentModel.findById(id).exec();
    if (!enrollment) {
      throw new NotFoundException(`Enrollment with ID '${id}' not found`);
    }

    if (enrollment.status !== EnrollmentStatus.ACTIVE) {
      throw new BadRequestException(
        `Cannot drop enrollment with status '${enrollment.status}'. Only ACTIVE enrollments can be dropped.`,
      );
    }

    enrollment.status = EnrollmentStatus.DROPPED;
    await enrollment.save();

    await this.coursesService.decrementEnrolledCount(
      enrollment.course.toString(),
    );

    return { message: 'Enrollment dropped successfully' };
  }
}
