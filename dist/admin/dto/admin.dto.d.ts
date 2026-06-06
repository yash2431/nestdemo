import { AdminRole } from '../schemas/admin.schema';
export declare class RegisterAdminDto {
    name: string;
    email: string;
    password: string;
    role?: AdminRole;
}
export declare class LoginAdminDto {
    email: string;
    password: string;
}
declare const UpdateAdminDto_base: import("@nestjs/common").Type<Partial<RegisterAdminDto>>;
export declare class UpdateAdminDto extends UpdateAdminDto_base {
}
export {};
