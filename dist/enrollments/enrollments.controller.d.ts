import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto, UpdateEnrollmentDto, QueryEnrollmentDto } from './dto/enrollment.dto';
export declare class EnrollmentsController {
    private readonly enrollmentsService;
    constructor(enrollmentsService: EnrollmentsService);
    enroll(dto: CreateEnrollmentDto): Promise<{
        message: string;
        data: Omit<import("mongoose").Document<unknown, {}, import("./schemas/enrollment.schema").EnrollmentDocument, {}, {}> & import("./schemas/enrollment.schema").Enrollment & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        }, never>;
        seatsRemaining?: undefined;
    } | {
        message: string;
        seatsRemaining: number;
        data: Omit<import("mongoose").Document<unknown, {}, import("./schemas/enrollment.schema").EnrollmentDocument, {}, {}> & import("./schemas/enrollment.schema").Enrollment & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        }, never>;
    }>;
    findAll(query: QueryEnrollmentDto): Promise<{
        total: number;
        data: (import("mongoose").Document<unknown, {}, import("./schemas/enrollment.schema").EnrollmentDocument, {}, {}> & import("./schemas/enrollment.schema").Enrollment & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/enrollment.schema").EnrollmentDocument, {}, {}> & import("./schemas/enrollment.schema").Enrollment & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getStudentEnrollments(studentId: string): Promise<{
        total: number;
        data: (import("mongoose").Document<unknown, {}, import("./schemas/enrollment.schema").EnrollmentDocument, {}, {}> & import("./schemas/enrollment.schema").Enrollment & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    getCourseEnrollments(courseId: string): Promise<{
        total: number;
        data: (import("mongoose").Document<unknown, {}, import("./schemas/enrollment.schema").EnrollmentDocument, {}, {}> & import("./schemas/enrollment.schema").Enrollment & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    update(id: string, dto: UpdateEnrollmentDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./schemas/enrollment.schema").EnrollmentDocument, {}, {}> & import("./schemas/enrollment.schema").Enrollment & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    drop(id: string): Promise<{
        message: string;
    }>;
}
