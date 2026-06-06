import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument, CourseStatus } from './schemas/course.schema';
import { CreateCourseDto, UpdateCourseDto, QueryCourseDto } from './dto/course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<CourseDocument>,
  ) {}

  async create(dto: CreateCourseDto) {
    const existing = await this.courseModel
      .findOne({ courseCode: dto.courseCode.toUpperCase() })
      .exec();

    if (existing) {
      throw new ConflictException(
        `A course with code '${dto.courseCode.toUpperCase()}' already exists`,
      );
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

  async findAll(query: QueryCourseDto) {
    const filter: any = {};

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

  async findOne(id: string) {
    const course = await this.courseModel.findById(id).exec();
    if (!course) {
      throw new NotFoundException(`Course with ID '${id}' not found`);
    }
    return course;
  }

  async findByCode(courseCode: string) {
    const course = await this.courseModel
      .findOne({ courseCode: courseCode.toUpperCase() })
      .exec();
    if (!course) {
      throw new NotFoundException(`Course with code '${courseCode}' not found`);
    }
    return course;
  }

  async update(id: string, dto: UpdateCourseDto) {
    if (dto.courseCode) {
      dto.courseCode = dto.courseCode.toUpperCase();
      const conflict = await this.courseModel
        .findOne({ courseCode: dto.courseCode, _id: { $ne: id } })
        .exec();
      if (conflict) {
        throw new ConflictException(
          `Course code '${dto.courseCode}' is already in use`,
        );
      }
    }

    // Prevent reducing maxCapacity below current enrolled count
    if (dto.maxCapacity !== undefined) {
      const course = await this.findOne(id);
      if (dto.maxCapacity < course.enrolledCount) {
        throw new BadRequestException(
          `Cannot set max capacity to ${dto.maxCapacity}. There are already ${course.enrolledCount} students enrolled.`,
        );
      }
    }

    const course = await this.courseModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    if (!course) {
      throw new NotFoundException(`Course with ID '${id}' not found`);
    }

    return {
      message: 'Course updated successfully',
      data: course,
    };
  }

  async remove(id: string) {
    const course = await this.courseModel.findById(id).exec();
    if (!course) {
      throw new NotFoundException(`Course with ID '${id}' not found`);
    }

    if (course.enrolledCount > 0) {
      throw new BadRequestException(
        `Cannot delete course '${course.title}' as it has ${course.enrolledCount} active enrollments`,
      );
    }

    await course.deleteOne();
    return { message: `Course '${course.title}' deleted successfully` };
  }

  // Internal method used by EnrollmentsService
  async incrementEnrolledCount(courseId: string): Promise<CourseDocument> {
    const course = await this.courseModel
      .findByIdAndUpdate(
        courseId,
        { $inc: { enrolledCount: 1 } },
        { new: true },
      )
      .exec();
    if (!course) throw new NotFoundException(`Course not found`);
    return course;
  }

  async decrementEnrolledCount(courseId: string): Promise<CourseDocument> {
    const course = await this.courseModel
      .findByIdAndUpdate(
        courseId,
        { $inc: { enrolledCount: -1 } },
        { new: true },
      )
      .exec();
    if (!course) throw new NotFoundException(`Course not found`);
    return course;
  }
}
