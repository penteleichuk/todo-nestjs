import { Types } from 'mongoose';
import { StatusType } from './../../shared/consts/task-status';
export declare class UpdateTaskDto {
    name: string;
    taskId: string;
    status: StatusType;
    author: Types.ObjectId;
}
