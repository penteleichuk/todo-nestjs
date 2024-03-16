import { Types } from 'mongoose';
import { StatusType } from '../../shared/consts/task-status';
export declare class UpdateTaskDto {
    name: string;
    taskId: Types.ObjectId;
    status: StatusType;
    author: Types.ObjectId;
}
