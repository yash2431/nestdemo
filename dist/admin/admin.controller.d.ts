import { AdminService } from './admin.service';
import { RegisterAdminDto, LoginAdminDto, UpdateAdminDto } from './dto/admin.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
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
    getProfile(userId: string): Promise<any>;
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
}
