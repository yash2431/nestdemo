import { Model } from 'mongoose';
import { Student, StudentDocument } from './schemas/student.schema';
import { CreateStudentDto, UpdateStudentDto, QueryStudentDto } from './dto/student.dto';
export declare class StudentsService {
    private readonly studentModel;
    constructor(studentModel: Model<StudentDocument>);
    create(dto: CreateStudentDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, StudentDocument, {}, {}> & Student & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    findAll(query: QueryStudentDto): Promise<{
        total: number;
        data: (import("mongoose").Document<unknown, {}, StudentDocument, {}, {}> & Student & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, StudentDocument, {}, {}> & Student & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findByStudentId(studentId: string): Promise<import("mongoose").Document<unknown, {}, StudentDocument, {}, {}> & Student & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateStudentDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, StudentDocument, {}, {}> & Student & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
