import { Types } from 'mongoose';
export declare class AccountActivationDto {
    emailToken: string;
    author: Types.ObjectId;
}
