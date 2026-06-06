import { EnrollmentStatus, Grade } from '../schemas/enrollment.schema';
export declare class CreateEnrollmentDto {
    studentId: string;
    courseId: string;
    remarks?: string;
}
export declare class UpdateEnrollmentDto {
    status?: EnrollmentStatus;
    grade?: Grade;
    remarks?: string;
}
export declare class QueryEnrollmentDto {
    studentId?: string;
    courseId?: string;
    status?: EnrollmentStatus;
}
