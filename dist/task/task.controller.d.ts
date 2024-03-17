import { Types } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(author: Types.ObjectId, dto: CreateTaskDto): Promise<{
        name: string;
        _id: Types.ObjectId;
        status: import("../shared/consts/task-status").StatusType;
        createdAt?: Date;
        updatedAt?: Date;
        id: string;
    }>;
    delete(author: Types.ObjectId, dto: DeleteTaskDto): Promise<{
        name: string;
        _id: Types.ObjectId;
        status: import("../shared/consts/task-status").StatusType;
        createdAt?: Date;
        updatedAt?: Date;
        id: string;
    }>;
    update(author: Types.ObjectId, dto: UpdateTaskDto): Promise<{
        name: string;
        _id: Types.ObjectId;
        status: import("../shared/consts/task-status").StatusType;
        createdAt?: Date;
        updatedAt?: Date;
        id: string;
    }>;
}
