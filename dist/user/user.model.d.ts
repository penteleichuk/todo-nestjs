import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';
export interface UserModel extends Base {
}
export declare class UserModel extends TimeStamps {
    _id: Types.ObjectId;
    name: string;
    password: string;
    email: string;
    emailActivate: boolean;
    emailToken: string;
    forgotToken: string;
    tokenUpdatedAt: Date;
    updatedAt: Date;
}
