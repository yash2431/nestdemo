import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { RegisterAdminDto, LoginAdminDto, UpdateAdminDto } from './dto/admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterAdminDto) {
    const existing = await this.adminModel.findOne({ email: dto.email }).exec();
    if (existing) {
      throw new ConflictException(`Admin with email '${dto.email}' already exists`);
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);
    const admin = await this.adminModel.create({
      ...dto,
      password: hashedPassword,
    });

    const token = this.generateToken(admin);
    return {
      message: 'Admin registered successfully',
      admin: this.sanitize(admin),
      access_token: token,
    };
  }

  async login(dto: LoginAdminDto) {
    const admin = await this.adminModel
      .findOne({ email: dto.email })
      .select('+password')
      .exec();

    if (!admin) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!admin.isActive) {
      throw new UnauthorizedException('Your account has been deactivated');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.generateToken(admin);
    return {
      message: 'Login successful',
      admin: this.sanitize(admin),
      access_token: token,
    };
  }

  async findAll() {
    const admins = await this.adminModel.find().sort({ createdAt: -1 }).exec();
    return {
      total: admins.length,
      data: admins.map((a) => this.sanitize(a)),
    };
  }

  async findOne(id: string) {
    const admin = await this.adminModel.findById(id).exec();
    if (!admin) {
      throw new NotFoundException(`Admin with ID '${id}' not found`);
    }
    return this.sanitize(admin);
  }

  async update(id: string, dto: UpdateAdminDto) {
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 12);
    }

    const admin = await this.adminModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    if (!admin) {
      throw new NotFoundException(`Admin with ID '${id}' not found`);
    }

    return {
      message: 'Admin updated successfully',
      data: this.sanitize(admin),
    };
  }

  async deactivate(id: string) {
    const admin = await this.adminModel
      .findByIdAndUpdate(id, { isActive: false }, { new: true })
      .exec();

    if (!admin) {
      throw new NotFoundException(`Admin with ID '${id}' not found`);
    }

    return { message: 'Admin account deactivated successfully' };
  }

  async getProfile(userId: string) {
    return this.findOne(userId);
  }

  private generateToken(admin: AdminDocument): string {
    return this.jwtService.sign({
      sub: admin._id.toString(),
      email: admin.email,
      role: admin.role,
    });
  }

  private sanitize(admin: AdminDocument) {
    const obj = admin.toObject();
    delete obj.password;
    return obj;
  }
}
