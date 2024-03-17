import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
export interface UserModel extends Base {
}
export declare class UserModel extends TimeStamps {
    name: string;
    isBanned: boolean;
    password: string;
    email: string;
    emailToken: string;
    forgotToken: string;
    tokenUpdatedAt: Date;
}
