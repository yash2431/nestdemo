import { CoursesService } from './courses.service';
import { CreateCourseDto, UpdateCourseDto, QueryCourseDto } from './dto/course.dto';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    create(dto: CreateCourseDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./schemas/course.schema").CourseDocument, {}, {}> & import("./schemas/course.schema").Course & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    findAll(query: QueryCourseDto): Promise<{
        total: number;
        data: (import("mongoose").Document<unknown, {}, import("./schemas/course.schema").CourseDocument, {}, {}> & import("./schemas/course.schema").Course & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/course.schema").CourseDocument, {}, {}> & import("./schemas/course.schema").Course & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateCourseDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./schemas/course.schema").CourseDocument, {}, {}> & import("./schemas/course.schema").Course & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
