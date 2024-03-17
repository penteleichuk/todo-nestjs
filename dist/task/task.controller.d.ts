/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Types } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { GetByIdTaskDto } from './dto/get-byid-task.dto';
import { SwapOrderTaskDto } from './dto/swap-order-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskModel } from './task.model';
import { TaskService } from './task.service';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    getById(author: Types.ObjectId, dto: GetByIdTaskDto): Promise<import("mongoose").Document<Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, TaskModel> & TaskModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & Required<{
        _id: Types.ObjectId;
    }>>;
    create(author: Types.ObjectId, dto: CreateTaskDto): Promise<{
        _id: Types.ObjectId;
        name: string;
        updatedAt: Date;
        createdAt: Date;
        id: string;
        order: number;
        status: import("../shared/consts/task-status").StatusType;
    }>;
    delete(author: Types.ObjectId, dto: DeleteTaskDto): Promise<{
        _id: Types.ObjectId;
        name: string;
        updatedAt: Date;
        createdAt: Date;
        id: string;
        order: number;
        status: import("../shared/consts/task-status").StatusType;
    }>;
    update(author: Types.ObjectId, dto: UpdateTaskDto): Promise<{
        _id: Types.ObjectId;
        name: string;
        updatedAt: Date;
        createdAt: Date;
        id: string;
        order: number;
        status: import("../shared/consts/task-status").StatusType;
    }>;
    swapTodoOrders(author: Types.ObjectId, dto: SwapOrderTaskDto): Promise<(import("mongoose").Document<Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, TaskModel> & TaskModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & Required<{
        _id: Types.ObjectId;
    }>)[]>;
}
