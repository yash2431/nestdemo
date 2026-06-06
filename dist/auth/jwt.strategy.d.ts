import { Strategy } from 'passport-jwt';
import { Model } from 'mongoose';
import { AdminDocument } from '../admin/schemas/admin.schema';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly adminModel;
    constructor(adminModel: Model<AdminDocument>);
    validate(payload: {
        sub: string;
        email: string;
        role: string;
    }): Promise<{
        _id: string;
        email: string;
        role: string;
    }>;
}
export {};
