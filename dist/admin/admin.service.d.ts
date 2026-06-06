import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { AdminDocument } from './schemas/admin.schema';
import { RegisterAdminDto, LoginAdminDto, UpdateAdminDto } from './dto/admin.dto';
export declare class AdminService {
    private readonly adminModel;
    private readonly jwtService;
    constructor(adminModel: Model<AdminDocument>, jwtService: JwtService);
    register(dto: RegisterAdminDto): Promise<{
        message: string;
        admin: any;
        access_token: string;
    }>;
    login(dto: LoginAdminDto): Promise<{
        message: string;
        admin: any;
        access_token: string;
    }>;
    findAll(): Promise<{
        total: number;
        data: any[];
    }>;
    findOne(id: string): Promise<any>;
    update(id: string, dto: UpdateAdminDto): Promise<{
        message: string;
        data: any;
    }>;
    deactivate(id: string): Promise<{
        message: string;
    }>;
    getProfile(userId: string): Promise<any>;
    private generateToken;
    private sanitize;
}
