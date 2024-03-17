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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ModelType } from '@typegoose/typegoose/lib/types';
import { TodoModel } from './../todo/todo.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { GetByIdTaskDto } from './dto/get-byid-task.dto';
import { SwapOrderTaskDto } from './dto/swap-order-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskModel } from './task.model';
export declare class TaskService {
    private readonly taskModel;
    private readonly todoModel;
    constructor(taskModel: ModelType<TaskModel>, todoModel: ModelType<TodoModel>);
    getById(dto: GetByIdTaskDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, TaskModel> & TaskModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    create(dto: CreateTaskDto): Promise<{
        _id: import("mongoose").Types.ObjectId;
        name: string;
        updatedAt: Date;
        createdAt: Date;
        id: string;
        order: number;
        status: import("../shared/consts/task-status").StatusType;
    }>;
    delete(dto: DeleteTaskDto): Promise<{
        _id: import("mongoose").Types.ObjectId;
        name: string;
        updatedAt: Date;
        createdAt: Date;
        id: string;
        order: number;
        status: import("../shared/consts/task-status").StatusType;
    }>;
    update(dto: UpdateTaskDto): Promise<{
        _id: import("mongoose").Types.ObjectId;
        name: string;
        updatedAt: Date;
        createdAt: Date;
        id: string;
        order: number;
        status: import("../shared/consts/task-status").StatusType;
    }>;
    swapTaskOrders(dto: SwapOrderTaskDto): Promise<(import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, TaskModel> & TaskModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
}
