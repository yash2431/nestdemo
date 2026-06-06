import { Document } from 'mongoose';
export type CourseDocument = Course & Document;
export declare enum CourseStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    COMPLETED = "completed"
}
export declare class Course {
    courseCode: string;
    title: string;
    description: string;
    instructor: string;
    credits: number;
    maxCapacity: number;
    enrolledCount: number;
    department: string;
    semester: string;
    schedule: string;
    status: CourseStatus;
}
export declare const CourseSchema: import("mongoose").Schema<Course, import("mongoose").Model<Course, any, any, any, Document<unknown, any, Course, any, {}> & Course & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Course, Document<unknown, {}, import("mongoose").FlatRecord<Course>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Course> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
