import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { AdminRole } from '../schemas/admin.schema';

export class RegisterAdminDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the admin' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'admin@college.edu', description: 'Admin email address' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Admin@1234', description: 'Password (min 6 characters)' })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiPropertyOptional({
    enum: AdminRole,
    example: AdminRole.ADMIN,
    description: 'Admin role',
  })
  @IsEnum(AdminRole)
  @IsOptional()
  role?: AdminRole;
}

export class LoginAdminDto {
  @ApiProperty({ example: 'admin@college.edu' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Admin@1234' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateAdminDto extends PartialType(RegisterAdminDto) {}
