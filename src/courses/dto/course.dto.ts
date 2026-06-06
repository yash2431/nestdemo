import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CourseStatus } from '../schemas/course.schema';

export class CreateCourseDto {
  @ApiProperty({ example: 'CS101', description: 'Unique course code (alphanumeric)' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z0-9]+$/, { message: 'Course code must be alphanumeric uppercase letters and numbers' })
  courseCode: string;

  @ApiProperty({ example: 'Introduction to Computer Science' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @ApiPropertyOptional({ example: 'A foundational course covering programming concepts.' })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({ example: 'Dr. Alan Turing' })
  @IsString()
  @IsNotEmpty()
  instructor: string;

  @ApiProperty({ example: 3, description: 'Credit hours (minimum 1)' })
  @IsInt()
  @Min(1)
  credits: number;

  @ApiProperty({ example: 30, description: 'Maximum enrollment capacity' })
  @IsInt()
  @Min(1)
  maxCapacity: number;

  @ApiPropertyOptional({ example: 'Computer Science' })
  @IsString()
  @IsOptional()
  department?: string;

  @ApiProperty({ example: '2024-01', description: 'Semester/term identifier' })
  @IsString()
  @IsNotEmpty()
  semester: string;

  @ApiPropertyOptional({ example: 'Mon/Wed 9:00-10:30 AM' })
  @IsString()
  @IsOptional()
  schedule?: string;

  @ApiPropertyOptional({ enum: CourseStatus, example: CourseStatus.ACTIVE })
  @IsEnum(CourseStatus)
  @IsOptional()
  status?: CourseStatus;
}

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}

export class QueryCourseDto {
  @ApiPropertyOptional({ example: 'Computer Science', description: 'Filter by department' })
  @IsString()
  @IsOptional()
  department?: string;

  @ApiPropertyOptional({ example: '2024-01', description: 'Filter by semester' })
  @IsString()
  @IsOptional()
  semester?: string;

  @ApiPropertyOptional({ enum: CourseStatus, description: 'Filter by status' })
  @IsEnum(CourseStatus)
  @IsOptional()
  status?: CourseStatus;

  @ApiPropertyOptional({ example: 'false', description: 'Filter only courses with available seats' })
  @IsOptional()
  availableOnly?: string;
}
