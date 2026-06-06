import { Model, Types } from 'mongoose';
import { Enrollment, EnrollmentDocument } from './schemas/enrollment.schema';
import { CreateEnrollmentDto, UpdateEnrollmentDto, QueryEnrollmentDto } from './dto/enrollment.dto';
import { CoursesService } from '../courses/courses.service';
import { StudentsService } from '../students/students.service';
export declare class EnrollmentsService {
    private readonly enrollmentModel;
    private readonly coursesService;
    private readonly studentsService;
    constructor(enrollmentModel: Model<EnrollmentDocument>, coursesService: CoursesService, studentsService: StudentsService);
    enroll(dto: CreateEnrollmentDto): Promise<{
        message: string;
        data: Omit<import("mongoose").Document<unknown, {}, EnrollmentDocument, {}, {}> & Enrollment & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        }, never>;
        seatsRemaining?: undefined;
    } | {
        message: string;
        seatsRemaining: number;
        data: Omit<import("mongoose").Document<unknown, {}, EnrollmentDocument, {}, {}> & Enrollment & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        }, never>;
    }>;
    findAll(query: QueryEnrollmentDto): Promise<{
        total: number;
        data: (import("mongoose").Document<unknown, {}, EnrollmentDocument, {}, {}> & Enrollment & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, EnrollmentDocument, {}, {}> & Enrollment & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getStudentEnrollments(studentId: string): Promise<{
        total: number;
        data: (import("mongoose").Document<unknown, {}, EnrollmentDocument, {}, {}> & Enrollment & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    getCourseEnrollments(courseId: string): Promise<{
        total: number;
        data: (import("mongoose").Document<unknown, {}, EnrollmentDocument, {}, {}> & Enrollment & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    update(id: string, dto: UpdateEnrollmentDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, EnrollmentDocument, {}, {}> & Enrollment & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    drop(id: string): Promise<{
        message: string;
    }>;
}
