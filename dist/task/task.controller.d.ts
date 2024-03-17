import { Types } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(author: Types.ObjectId, dto: CreateTaskDto): Promise<{
        _id: Types.ObjectId;
        id: string;
        name: string;
        status: import("../shared/consts/task-status").StatusType;
        createdAt?: Date;
        updatedAt?: Date;
    }>;
    delete(author: Types.ObjectId, dto: DeleteTaskDto): Promise<{
        _id: Types.ObjectId;
        id: string;
        name: string;
        status: import("../shared/consts/task-status").StatusType;
        createdAt?: Date;
        updatedAt?: Date;
    }>;
    update(author: Types.ObjectId, dto: UpdateTaskDto): Promise<{
        _id: Types.ObjectId;
        id: string;
        name: string;
        status: import("../shared/consts/task-status").StatusType;
        createdAt?: Date;
        updatedAt?: Date;
    }>;
}
