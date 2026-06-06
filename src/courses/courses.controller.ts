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
import { CoursesService } from './courses.service';
import { CreateCourseDto, UpdateCourseDto, QueryCourseDto } from './dto/course.dto';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Create a new course',
    description: 'Creates a course. **Requires admin authentication.**',
  })
  @ApiResponse({ status: 201, description: 'Course created successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 409, description: 'Course code already exists' })
  create(@Body() dto: CreateCourseDto) {
    return this.coursesService.create(dto);
  }

  @Public()
  @Get()
  @ApiOperation({
    summary: 'Get all courses',
    description: 'Returns all available courses. Optionally filter by department, semester, status, or availability.',
  })
  @ApiQuery({ name: 'department', required: false, example: 'Computer Science' })
  @ApiQuery({ name: 'semester', required: false, example: '2024-01' })
  @ApiQuery({ name: 'status', required: false, enum: ['active', 'inactive', 'completed'] })
  @ApiQuery({ name: 'availableOnly', required: false, enum: ['true', 'false'], description: 'Only return courses with available seats' })
  @ApiResponse({ status: 200, description: 'List of courses' })
  findAll(@Query() query: QueryCourseDto) {
    return this.coursesService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get course by ID' })
  @ApiParam({ name: 'id', description: 'Course MongoDB ObjectId' })
  @ApiResponse({ status: 200, description: 'Course details' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update course details', description: '**Requires admin authentication.**' })
  @ApiParam({ name: 'id', description: 'Course MongoDB ObjectId' })
  @ApiResponse({ status: 200, description: 'Course updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.coursesService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete a course', description: '**Requires admin authentication.** Only courses with zero enrollments can be deleted.' })
  @ApiParam({ name: 'id', description: 'Course MongoDB ObjectId' })
  @ApiResponse({ status: 200, description: 'Course deleted' })
  @ApiResponse({ status: 400, description: 'Course has active enrollments' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
