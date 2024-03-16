import { Types } from 'mongoose';
import { StatusType } from '../../shared/consts/task-status';
export declare class CreateTaskDto {
    name: string;
    categoryId: Types.ObjectId;
    status: StatusType;
    author: Types.ObjectId;
}
