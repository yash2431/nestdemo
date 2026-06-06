import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EnrollmentStatus, Grade } from '../schemas/enrollment.schema';

export class CreateEnrollmentDto {
  @ApiProperty({
    example: '665f1a2b3c4d5e6f7a8b9c0d',
    description: 'MongoDB ObjectId of the student',
  })
  @IsMongoId({ message: 'studentId must be a valid MongoDB ObjectId' })
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({
    example: '665f1a2b3c4d5e6f7a8b9c0e',
    description: 'MongoDB ObjectId of the course',
  })
  @IsMongoId({ message: 'courseId must be a valid MongoDB ObjectId' })
  @IsNotEmpty()
  courseId: string;

  @ApiPropertyOptional({ example: 'Walk-in enrollment' })
  @IsString()
  @IsOptional()
  remarks?: string;
}

export class UpdateEnrollmentDto {
  @ApiPropertyOptional({
    enum: EnrollmentStatus,
    example: EnrollmentStatus.DROPPED,
    description: 'Update enrollment status',
  })
  @IsEnum(EnrollmentStatus)
  @IsOptional()
  status?: EnrollmentStatus;

  @ApiPropertyOptional({
    enum: Grade,
    example: Grade.A,
    description: 'Assign a grade to the student',
  })
  @IsEnum(Grade)
  @IsOptional()
  grade?: Grade;

  @ApiPropertyOptional({ example: 'Updated remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}

export class QueryEnrollmentDto {
  @ApiPropertyOptional({ description: 'Filter by student MongoDB ObjectId' })
  @IsMongoId()
  @IsOptional()
  studentId?: string;

  @ApiPropertyOptional({ description: 'Filter by course MongoDB ObjectId' })
  @IsMongoId()
  @IsOptional()
  courseId?: string;

  @ApiPropertyOptional({ enum: EnrollmentStatus })
  @IsEnum(EnrollmentStatus)
  @IsOptional()
  status?: EnrollmentStatus;
}
