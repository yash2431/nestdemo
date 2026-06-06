import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type StudentDocument = Student & Document;

export enum StudentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  GRADUATED = 'graduated',
  SUSPENDED = 'suspended',
}

@Schema({ timestamps: true, collection: 'students' })
export class Student {
  @ApiProperty({ example: 'STU-2024-001' })
  @Prop({ required: true, unique: true, uppercase: true, trim: true })
  studentId: string;

  @ApiProperty({ example: 'Jane' })
  @Prop({ required: true, trim: true })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @Prop({ required: true, trim: true })
  lastName: string;

  @ApiProperty({ example: 'jane.doe@student.edu' })
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @ApiProperty({ example: '+91-9876543210' })
  @Prop({ trim: true, default: '' })
  phone: string;

  @ApiProperty({ example: '2000-05-15' })
  @Prop({ required: true })
  dateOfBirth: Date;

  @ApiProperty({ example: 'Computer Science' })
  @Prop({ trim: true, default: 'Undeclared' })
  major: string;

  @ApiProperty({ example: 2024 })
  @Prop({ required: true })
  enrollmentYear: number;

  @ApiProperty({ enum: StudentStatus, example: StudentStatus.ACTIVE })
  @Prop({ type: String, enum: StudentStatus, default: StudentStatus.ACTIVE })
  status: StudentStatus;

  @ApiProperty({ example: '123 Main St, Pune, Maharashtra' })
  @Prop({ trim: true, default: '' })
  address: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);

// Full-name virtual
StudentSchema.virtual('fullName').get(function (this: StudentDocument) {
  return `${this.firstName} ${this.lastName}`;
});

StudentSchema.set('toJSON', { virtuals: true });
StudentSchema.set('toObject', { virtuals: true });
