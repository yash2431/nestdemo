import { StudentStatus } from '../schemas/student.schema';
export declare class CreateStudentDto {
    studentId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    dateOfBirth: string;
    major?: string;
    enrollmentYear: number;
    address?: string;
    status?: StudentStatus;
}
declare const UpdateStudentDto_base: import("@nestjs/common").Type<Partial<CreateStudentDto>>;
export declare class UpdateStudentDto extends UpdateStudentDto_base {
}
export declare class QueryStudentDto {
    major?: string;
    status?: StudentStatus;
    enrollmentYear?: number;
}
export {};
