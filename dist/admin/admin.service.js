"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const admin_schema_1 = require("./schemas/admin.schema");
let AdminService = class AdminService {
    constructor(adminModel, jwtService) {
        this.adminModel = adminModel;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const existing = await this.adminModel.findOne({ email: dto.email }).exec();
        if (existing) {
            throw new common_1.ConflictException(`Admin with email '${dto.email}' already exists`);
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
    async login(dto) {
        const admin = await this.adminModel
            .findOne({ email: dto.email })
            .select('+password')
            .exec();
        if (!admin) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        if (!admin.isActive) {
            throw new common_1.UnauthorizedException('Your account has been deactivated');
        }
        const isPasswordValid = await bcrypt.compare(dto.password, admin.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid email or password');
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
    async findOne(id) {
        const admin = await this.adminModel.findById(id).exec();
        if (!admin) {
            throw new common_1.NotFoundException(`Admin with ID '${id}' not found`);
        }
        return this.sanitize(admin);
    }
    async update(id, dto) {
        if (dto.password) {
            dto.password = await bcrypt.hash(dto.password, 12);
        }
        const admin = await this.adminModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
        if (!admin) {
            throw new common_1.NotFoundException(`Admin with ID '${id}' not found`);
        }
        return {
            message: 'Admin updated successfully',
            data: this.sanitize(admin),
        };
    }
    async deactivate(id) {
        const admin = await this.adminModel
            .findByIdAndUpdate(id, { isActive: false }, { new: true })
            .exec();
        if (!admin) {
            throw new common_1.NotFoundException(`Admin with ID '${id}' not found`);
        }
        return { message: 'Admin account deactivated successfully' };
    }
    async getProfile(userId) {
        return this.findOne(userId);
    }
    generateToken(admin) {
        return this.jwtService.sign({
            sub: admin._id.toString(),
            email: admin.email,
            role: admin.role,
        });
    }
    sanitize(admin) {
        const obj = admin.toObject();
        delete obj.password;
        return obj;
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(admin_schema_1.Admin.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AdminService);
//# sourceMappingURL=admin.service.js.map