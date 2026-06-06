import { StudentsService } from './students.service';
import { CreateStudentDto, UpdateStudentDto, QueryStudentDto } from './dto/student.dto';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    create(dto: CreateStudentDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./schemas/student.schema").StudentDocument, {}, {}> & import("./schemas/student.schema").Student & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    findAll(query: QueryStudentDto): Promise<{
        total: number;
        data: (import("mongoose").Document<unknown, {}, import("./schemas/student.schema").StudentDocument, {}, {}> & import("./schemas/student.schema").Student & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/student.schema").StudentDocument, {}, {}> & import("./schemas/student.schema").Student & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateStudentDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./schemas/student.schema").StudentDocument, {}, {}> & import("./schemas/student.schema").Student & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
