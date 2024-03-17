"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const task_model_1 = require("./task.model");
let TaskService = class TaskService {
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    async create(dto) {
        const task = await new this.taskModel(Object.assign(Object.assign({}, dto), { todo: dto.todoId })).populate([
            {
                path: 'todo',
                select: 'name',
            },
            {
                path: 'author',
                select: 'name',
            },
        ]);
        return task.save();
    }
    async delete(dto) {
        const response = await this.taskModel.findOneAndDelete({
            author: dto.author,
            _id: dto.taskId,
        });
        if (!response) {
            throw new common_1.NotFoundException(`Task not found`);
        }
        return response;
    }
    async update(dto) {
        const { author, taskId: _id } = dto, rest = __rest(dto, ["author", "taskId"]);
        const response = await this.taskModel
            .findOneAndUpdate({ author, _id }, Object.assign({}, rest), { new: true })
            .populate([
            {
                path: 'todo',
                select: 'name',
            },
            {
                path: 'author',
                select: 'name',
            },
        ]);
        if (!response) {
            throw new common_1.NotFoundException(`Task not found`);
        }
        return response;
    }
};
TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(task_model_1.TaskModel)),
    __metadata("design:paramtypes", [Object])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map