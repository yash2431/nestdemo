import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type EnrollmentDocument = Enrollment & Document;

export enum EnrollmentStatus {
  ACTIVE = 'active',
  DROPPED = 'dropped',
  COMPLETED = 'completed',
  WAITLISTED = 'waitlisted',
}

export enum Grade {
  A_PLUS = 'A+',
  A = 'A',
  A_MINUS = 'A-',
  B_PLUS = 'B+',
  B = 'B',
  B_MINUS = 'B-',
  C_PLUS = 'C+',
  C = 'C',
  C_MINUS = 'C-',
  D = 'D',
  F = 'F',
  INCOMPLETE = 'I',
  WITHDRAWN = 'W',
  NOT_GRADED = 'NG',
}

@Schema({ timestamps: true, collection: 'enrollments' })
export class Enrollment {
  @ApiProperty({ description: 'Student MongoDB ObjectId reference' })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Student',
    required: true,
    index: true,
  })
  student: Types.ObjectId;

  @ApiProperty({ description: 'Course MongoDB ObjectId reference' })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Course',
    required: true,
    index: true,
  })
  course: Types.ObjectId;

  @ApiProperty({ enum: EnrollmentStatus, example: EnrollmentStatus.ACTIVE })
  @Prop({
    type: String,
    enum: EnrollmentStatus,
    default: EnrollmentStatus.ACTIVE,
  })
  status: EnrollmentStatus;

  @ApiProperty({ example: '2024-01-15T00:00:00.000Z' })
  @Prop({ default: Date.now })
  enrolledAt: Date;

  @ApiProperty({ enum: Grade, example: Grade.NOT_GRADED, required: false })
  @Prop({ type: String, enum: Grade, default: Grade.NOT_GRADED })
  grade: Grade;

  @ApiProperty({ example: 'Student enrolled via walk-in', required: false })
  @Prop({ trim: true, default: '' })
  remarks: string;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);

// Compound unique index — prevents duplicate enrollments at database level
EnrollmentSchema.index({ student: 1, course: 1 }, { unique: true });
