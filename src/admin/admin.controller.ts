import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { RegisterAdminDto, LoginAdminDto, UpdateAdminDto } from './dto/admin.dto';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Public()
  @Post('register')
  @ApiOperation({
    summary: 'Register a new admin',
    description: 'Creates a new admin account and returns a JWT token.',
  })
  @ApiResponse({ status: 201, description: 'Admin registered successfully' })
  @ApiResponse({ status: 409, description: 'Email already in use' })
  register(@Body() dto: RegisterAdminDto) {
    return this.adminService.register(dto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Admin login',
    description: 'Authenticates an admin and returns a JWT Bearer token. Use this token in the Authorize button above.',
  })
  @ApiResponse({ status: 200, description: 'Login successful with access_token' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  login(@Body() dto: LoginAdminDto) {
    return this.adminService.login(dto);
  }

  @Get('profile')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get current admin profile', description: 'Returns the profile of the currently authenticated admin.' })
  @ApiResponse({ status: 200, description: 'Admin profile returned' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProfile(@CurrentUser('_id') userId: string) {
    return this.adminService.getProfile(userId);
  }

  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'List all admins', description: 'Returns a list of all registered admins. Requires authentication.' })
  @ApiResponse({ status: 200, description: 'List of admins returned' })
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get admin by ID' })
  @ApiParam({ name: 'id', description: 'Admin MongoDB ObjectId' })
  @ApiResponse({ status: 200, description: 'Admin found' })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update admin details' })
  @ApiParam({ name: 'id', description: 'Admin MongoDB ObjectId' })
  @ApiResponse({ status: 200, description: 'Admin updated successfully' })
  update(@Param('id') id: string, @Body() dto: UpdateAdminDto) {
    return this.adminService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Deactivate an admin account' })
  @ApiParam({ name: 'id', description: 'Admin MongoDB ObjectId' })
  @ApiResponse({ status: 200, description: 'Admin deactivated' })
  deactivate(@Param('id') id: string) {
    return this.adminService.deactivate(id);
  }
}
