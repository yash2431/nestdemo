import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { CreateCourseDto, UpdateCourseDto, QueryCourseDto } from './dto/course.dto';
export declare class CoursesService {
    private readonly courseModel;
    constructor(courseModel: Model<CourseDocument>);
    create(dto: CreateCourseDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, CourseDocument, {}, {}> & Course & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    findAll(query: QueryCourseDto): Promise<{
        total: number;
        data: (import("mongoose").Document<unknown, {}, CourseDocument, {}, {}> & Course & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, CourseDocument, {}, {}> & Course & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findByCode(courseCode: string): Promise<import("mongoose").Document<unknown, {}, CourseDocument, {}, {}> & Course & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateCourseDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, CourseDocument, {}, {}> & Course & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    incrementEnrolledCount(courseId: string): Promise<CourseDocument>;
    decrementEnrolledCount(courseId: string): Promise<CourseDocument>;
}
