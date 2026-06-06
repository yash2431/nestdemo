import { Document, Schema as MongooseSchema, Types } from 'mongoose';
export type EnrollmentDocument = Enrollment & Document;
export declare enum EnrollmentStatus {
    ACTIVE = "active",
    DROPPED = "dropped",
    COMPLETED = "completed",
    WAITLISTED = "waitlisted"
}
export declare enum Grade {
    A_PLUS = "A+",
    A = "A",
    A_MINUS = "A-",
    B_PLUS = "B+",
    B = "B",
    B_MINUS = "B-",
    C_PLUS = "C+",
    C = "C",
    C_MINUS = "C-",
    D = "D",
    F = "F",
    INCOMPLETE = "I",
    WITHDRAWN = "W",
    NOT_GRADED = "NG"
}
export declare class Enrollment {
    student: Types.ObjectId;
    course: Types.ObjectId;
    status: EnrollmentStatus;
    enrolledAt: Date;
    grade: Grade;
    remarks: string;
}
export declare const EnrollmentSchema: MongooseSchema<Enrollment, import("mongoose").Model<Enrollment, any, any, any, Document<unknown, any, Enrollment, any, {}> & Enrollment & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Enrollment, Document<unknown, {}, import("mongoose").FlatRecord<Enrollment>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Enrollment> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
