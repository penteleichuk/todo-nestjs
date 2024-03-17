import { Types } from 'mongoose';
import { StatusType } from './../../shared/consts/task-status';
export declare class UpdateTaskDto {
    taskId: string;
    name: string;
    status: StatusType;
    author: Types.ObjectId;
}
