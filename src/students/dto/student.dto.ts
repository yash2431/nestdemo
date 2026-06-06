import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { StudentStatus } from '../schemas/student.schema';

export class CreateStudentDto {
  @ApiProperty({ example: 'STU-2024-001', description: 'Unique student ID' })
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({ example: 'Jane' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  lastName: string;

  @ApiProperty({ example: 'jane.doe@student.edu' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({ example: '+91-9876543210' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: '2000-05-15', description: 'Date of birth (YYYY-MM-DD)' })
  @IsDateString({}, { message: 'Date of birth must be a valid date (YYYY-MM-DD)' })
  @IsNotEmpty()
  dateOfBirth: string;

  @ApiPropertyOptional({ example: 'Computer Science' })
  @IsString()
  @IsOptional()
  major?: string;

  @ApiProperty({ example: 2024, description: 'Year of enrollment' })
  @IsInt()
  @Min(2000)
  @Max(2100)
  enrollmentYear: number;

  @ApiPropertyOptional({ example: '123 Main St, Pune, Maharashtra' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ enum: StudentStatus, example: StudentStatus.ACTIVE })
  @IsEnum(StudentStatus)
  @IsOptional()
  status?: StudentStatus;
}

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}

export class QueryStudentDto {
  @ApiPropertyOptional({ example: 'Computer Science' })
  @IsString()
  @IsOptional()
  major?: string;

  @ApiPropertyOptional({ enum: StudentStatus })
  @IsEnum(StudentStatus)
  @IsOptional()
  status?: StudentStatus;

  @ApiPropertyOptional({ example: 2024 })
  @IsOptional()
  enrollmentYear?: number;
}
