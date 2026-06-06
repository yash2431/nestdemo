import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from './schemas/student.schema';
import { CreateStudentDto, UpdateStudentDto, QueryStudentDto } from './dto/student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private readonly studentModel: Model<StudentDocument>,
  ) {}

  async create(dto: CreateStudentDto) {
    // Check duplicate studentId
    const existingById = await this.studentModel
      .findOne({ studentId: dto.studentId.toUpperCase() })
      .exec();
    if (existingById) {
      throw new ConflictException(
        `Student with ID '${dto.studentId}' already exists`,
      );
    }

    // Check duplicate email
    const existingByEmail = await this.studentModel
      .findOne({ email: dto.email.toLowerCase() })
      .exec();
    if (existingByEmail) {
      throw new ConflictException(
        `A student with email '${dto.email}' is already registered`,
      );
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

  async findAll(query: QueryStudentDto) {
    const filter: any = {};

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

  async findOne(id: string) {
    const student = await this.studentModel.findById(id).exec();
    if (!student) {
      throw new NotFoundException(`Student with ID '${id}' not found`);
    }
    return student;
  }

  async findByStudentId(studentId: string) {
    const student = await this.studentModel
      .findOne({ studentId: studentId.toUpperCase() })
      .exec();
    if (!student) {
      throw new NotFoundException(`Student with student ID '${studentId}' not found`);
    }
    return student;
  }

  async update(id: string, dto: UpdateStudentDto) {
    if (dto.studentId) {
      const conflict = await this.studentModel
        .findOne({ studentId: dto.studentId.toUpperCase(), _id: { $ne: id } })
        .exec();
      if (conflict) {
        throw new ConflictException(`Student ID '${dto.studentId}' is already in use`);
      }
      dto.studentId = dto.studentId.toUpperCase();
    }

    if (dto.email) {
      const conflict = await this.studentModel
        .findOne({ email: dto.email.toLowerCase(), _id: { $ne: id } })
        .exec();
      if (conflict) {
        throw new ConflictException(`Email '${dto.email}' is already in use`);
      }
    }

    const student = await this.studentModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    if (!student) {
      throw new NotFoundException(`Student with ID '${id}' not found`);
    }

    return {
      message: 'Student updated successfully',
      data: student,
    };
  }

  async remove(id: string) {
    const student = await this.studentModel.findByIdAndDelete(id).exec();
    if (!student) {
      throw new NotFoundException(`Student with ID '${id}' not found`);
    }
    return {
      message: `Student '${student.firstName} ${student.lastName}' removed successfully`,
    };
  }
}
