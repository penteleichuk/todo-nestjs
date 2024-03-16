import { Types } from 'mongoose';
export declare class UpdateCategoryDto {
    name: string;
    author: Types.ObjectId;
    categoryId: Types.ObjectId;
}
