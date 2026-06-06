import { Document } from 'mongoose';
export type AdminDocument = Admin & Document;
export declare enum AdminRole {
    SUPER_ADMIN = "super_admin",
    ADMIN = "admin"
}
export declare class Admin {
    name: string;
    email: string;
    password: string;
    role: AdminRole;
    isActive: boolean;
}
export declare const AdminSchema: import("mongoose").Schema<Admin, import("mongoose").Model<Admin, any, any, any, Document<unknown, any, Admin, any, {}> & Admin & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Admin, Document<unknown, {}, import("mongoose").FlatRecord<Admin>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Admin> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
