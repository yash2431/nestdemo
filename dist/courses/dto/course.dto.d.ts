import { CourseStatus } from '../schemas/course.schema';
export declare class CreateCourseDto {
    courseCode: string;
    title: string;
    description?: string;
    instructor: string;
    credits: number;
    maxCapacity: number;
    department?: string;
    semester: string;
    schedule?: string;
    status?: CourseStatus;
}
declare const UpdateCourseDto_base: import("@nestjs/common").Type<Partial<CreateCourseDto>>;
export declare class UpdateCourseDto extends UpdateCourseDto_base {
}
export declare class QueryCourseDto {
    department?: string;
    semester?: string;
    status?: CourseStatus;
    availableOnly?: string;
}
export {};
