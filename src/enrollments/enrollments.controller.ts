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
import { EnrollmentsService } from './enrollments.service';
import {
  CreateEnrollmentDto,
  UpdateEnrollmentDto,
  QueryEnrollmentDto,
} from './dto/enrollment.dto';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Enrollments')
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Public()
  @Post()
  @ApiOperation({
    summary: 'Enroll a student in a course',
    description: `
**Core enrollment engine.** Enrolls a student into a course with the following safeguards:

- ❌ **Duplicate Check**: A student cannot enroll in the same course twice (active enrollment).
- ❌ **Capacity Check**: Enrollment fails if the course has reached its \`maxCapacity\`.
- ❌ **Status Check**: Student must be \`active\` and course must be \`active\`.
- ✅ **Re-enrollment**: A student who dropped a course can re-enroll (if capacity allows).
    `,
  })
  @ApiResponse({ status: 201, description: 'Enrollment successful' })
  @ApiResponse({ status: 400, description: 'Student or course is not active' })
  @ApiResponse({ status: 404, description: 'Student or course not found' })
  @ApiResponse({ status: 409, description: 'Duplicate enrollment OR course at capacity' })
  enroll(@Body() dto: CreateEnrollmentDto) {
    return this.enrollmentsService.enroll(dto);
  }

  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'List all enrollments',
    description: '**Requires admin authentication.** Filter by student, course, or status.',
  })
  @ApiQuery({ name: 'studentId', required: false, description: 'Filter by student ObjectId' })
  @ApiQuery({ name: 'courseId', required: false, description: 'Filter by course ObjectId' })
  @ApiQuery({ name: 'status', required: false, enum: ['active', 'dropped', 'completed', 'waitlisted'] })
  @ApiResponse({ status: 200, description: 'List of enrollments with populated student & course data' })
  findAll(@Query() query: QueryEnrollmentDto) {
    return this.enrollmentsService.findAll(query);
  }

  @Get(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get enrollment by ID' })
  @ApiParam({ name: 'id', description: 'Enrollment MongoDB ObjectId' })
  @ApiResponse({ status: 200, description: 'Enrollment details with student and course data' })
  @ApiResponse({ status: 404, description: 'Enrollment not found' })
  findOne(@Param('id') id: string) {
    return this.enrollmentsService.findOne(id);
  }

  @Public()
  @Get('student/:studentId')
  @ApiOperation({
    summary: "Get a student's enrollments",
    description: "Returns all enrollments for a specific student with populated course info.",
  })
  @ApiParam({ name: 'studentId', description: 'Student MongoDB ObjectId' })
  @ApiResponse({ status: 200, description: "Student's enrollment history" })
  @ApiResponse({ status: 404, description: 'Student not found' })
  getStudentEnrollments(@Param('studentId') studentId: string) {
    return this.enrollmentsService.getStudentEnrollments(studentId);
  }

  @Get('course/:courseId')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get all students enrolled in a course',
    description: '**Requires admin authentication.** Returns all active enrollments for a course.',
  })
  @ApiParam({ name: 'courseId', description: 'Course MongoDB ObjectId' })
  @ApiResponse({ status: 200, description: 'List of enrolled students' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  getCourseEnrollments(@Param('courseId') courseId: string) {
    return this.enrollmentsService.getCourseEnrollments(courseId);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Update enrollment status or grade',
    description: '**Requires admin authentication.** Update status (active/dropped/completed) or assign a grade.',
  })
  @ApiParam({ name: 'id', description: 'Enrollment MongoDB ObjectId' })
  @ApiResponse({ status: 200, description: 'Enrollment updated' })
  @ApiResponse({ status: 404, description: 'Enrollment not found' })
  update(@Param('id') id: string, @Body() dto: UpdateEnrollmentDto) {
    return this.enrollmentsService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Drop an enrollment',
    description: '**Requires admin authentication.** Changes status to DROPPED and frees up a seat.',
  })
  @ApiParam({ name: 'id', description: 'Enrollment MongoDB ObjectId' })
  @ApiResponse({ status: 200, description: 'Enrollment dropped successfully' })
  @ApiResponse({ status: 400, description: 'Enrollment is not active' })
  @ApiResponse({ status: 404, description: 'Enrollment not found' })
  drop(@Param('id') id: string) {
    return this.enrollmentsService.drop(id);
  }
}
