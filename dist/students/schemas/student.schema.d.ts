import { Document } from 'mongoose';
export type StudentDocument = Student & Document;
export declare enum StudentStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    GRADUATED = "graduated",
    SUSPENDED = "suspended"
}
export declare class Student {
    studentId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: Date;
    major: string;
    enrollmentYear: number;
    status: StudentStatus;
    address: string;
}
export declare const StudentSchema: import("mongoose").Schema<Student, import("mongoose").Model<Student, any, any, any, Document<unknown, any, Student, any, {}> & Student & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Student, Document<unknown, {}, import("mongoose").FlatRecord<Student>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Student> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
