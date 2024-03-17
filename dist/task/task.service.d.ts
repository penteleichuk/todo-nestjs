import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskModel } from './task.model';
export declare class TaskService {
    private readonly taskModel;
    constructor(taskModel: ModelType<TaskModel>);
    create(dto: CreateTaskDto): Promise<{
        _id: import("mongoose").Types.ObjectId;
        id: string;
        name: string;
        status: import("../shared/consts/task-status").StatusType;
        createdAt?: Date;
        updatedAt?: Date;
    }>;
    delete(dto: DeleteTaskDto): Promise<{
        _id: import("mongoose").Types.ObjectId;
        id: string;
        name: string;
        status: import("../shared/consts/task-status").StatusType;
        createdAt?: Date;
        updatedAt?: Date;
    }>;
    update(dto: UpdateTaskDto): Promise<{
        _id: import("mongoose").Types.ObjectId;
        id: string;
        name: string;
        status: import("../shared/consts/task-status").StatusType;
        createdAt?: Date;
        updatedAt?: Date;
    }>;
}
