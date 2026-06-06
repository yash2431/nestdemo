import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CourseDocument = Course & Document;

export enum CourseStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  COMPLETED = 'completed',
}

@Schema({ timestamps: true, collection: 'courses' })
export class Course {
  @ApiProperty({ example: 'CS101' })
  @Prop({ required: true, unique: true, uppercase: true, trim: true })
  courseCode: string;

  @ApiProperty({ example: 'Introduction to Computer Science' })
  @Prop({ required: true, trim: true })
  title: string;

  @ApiProperty({ example: 'A foundational course covering programming concepts.' })
  @Prop({ trim: true, default: '' })
  description: string;

  @ApiProperty({ example: 'Dr. Alan Turing' })
  @Prop({ required: true, trim: true })
  instructor: string;

  @ApiProperty({ example: 3 })
  @Prop({ required: true, min: 1 })
  credits: number;

  @ApiProperty({ example: 30, description: 'Maximum number of students allowed' })
  @Prop({ required: true, min: 1 })
  maxCapacity: number;

  @ApiProperty({ example: 0, description: 'Current enrolled student count' })
  @Prop({ default: 0, min: 0 })
  enrolledCount: number;

  @ApiProperty({ example: 'Computer Science' })
  @Prop({ trim: true, default: 'General' })
  department: string;

  @ApiProperty({ example: '2024-01', description: 'Academic semester/term' })
  @Prop({ required: true, trim: true })
  semester: string;

  @ApiProperty({ example: 'Mon/Wed 9:00-10:30 AM' })
  @Prop({ trim: true, default: '' })
  schedule: string;

  @ApiProperty({ enum: CourseStatus, example: CourseStatus.ACTIVE })
  @Prop({ type: String, enum: CourseStatus, default: CourseStatus.ACTIVE })
  status: CourseStatus;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

// Virtual: available seats
CourseSchema.virtual('availableSeats').get(function (this: CourseDocument) {
  return this.maxCapacity - this.enrolledCount;
});

CourseSchema.virtual('isFull').get(function (this: CourseDocument) {
  return this.enrolledCount >= this.maxCapacity;
});

CourseSchema.set('toJSON', { virtuals: true });
CourseSchema.set('toObject', { virtuals: true });
