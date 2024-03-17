"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const todo_model_1 = require("./../todo/todo.model");
const task_controller_1 = require("./task.controller");
const task_model_1 = require("./task.model");
const task_service_1 = require("./task.service");
let TaskModule = class TaskModule {
};
TaskModule = __decorate([
    (0, common_1.Module)({
        controllers: [task_controller_1.TaskController],
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: task_model_1.TaskModel,
                    schemaOptions: {
                        collection: 'Task',
                        versionKey: false,
                    },
                },
                {
                    typegooseClass: todo_model_1.TodoModel,
                    schemaOptions: {
                        collection: 'Todo',
                        versionKey: false,
                    },
                },
            ]),
            config_1.ConfigModule,
        ],
        providers: [task_service_1.TaskService],
    })
], TaskModule);
exports.TaskModule = TaskModule;
//# sourceMappingURL=task.module.js.map