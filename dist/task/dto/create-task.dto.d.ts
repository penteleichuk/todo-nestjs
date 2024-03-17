import { Types } from 'mongoose';
import { StatusType } from './../../shared/consts/task-status';
export declare class CreateTaskDto {
    name: string;
    todoId: Types.ObjectId;
    status: StatusType;
    author: Types.ObjectId;
}