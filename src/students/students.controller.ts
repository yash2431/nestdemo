import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { CreateStudentDto, UpdateStudentDto, QueryStudentDto } from './dto/student.dto';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Public()
  @Post()
  @ApiOperation({
    summary: 'Register a new student',
    description: 'Creates a new student profile. Open endpoint — no auth required.',
  })
  @ApiResponse({ status: 201, description: 'Student registered successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 409, description: 'Student ID or email already exists' })
  create(@Body() dto: CreateStudentDto) {
    return this.studentsService.create(dto);
  }

  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get all students',
    description: '**Requires admin authentication.** Returns all registered students with optional filters.',
  })
  @ApiQuery({ name: 'major', required: false, example: 'Computer Science' })
  @ApiQuery({ name: 'status', required: false, enum: ['active', 'inactive', 'graduated', 'suspended'] })
  @ApiQuery({ name: 'enrollmentYear', required: false, example: 2024 })
  @ApiResponse({ status: 200, description: 'List of students' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll(@Query() query: QueryStudentDto) {
    return this.studentsService.findAll(query);
  }

  @Get(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get student by ID', description: '**Requires admin authentication.**' })
  @ApiParam({ name: 'id', description: 'Student MongoDB ObjectId' })
  @ApiResponse({ status: 200, description: 'Student details' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update student details', description: '**Requires admin authentication.**' })
  @ApiParam({ name: 'id', description: 'Student MongoDB ObjectId' })
  @ApiResponse({ status: 200, description: 'Student updated' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  update(@Param('id') id: string, @Body() dto: UpdateStudentDto) {
    return this.studentsService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Remove a student', description: '**Requires admin authentication.**' })
  @ApiParam({ name: 'id', description: 'Student MongoDB ObjectId' })
  @ApiResponse({ status: 200, description: 'Student removed' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}
