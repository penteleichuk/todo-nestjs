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
const todo_model_1 = require("./../todo/todo.model");
const task_model_1 = require("./task.model");
let TaskService = class TaskService {
    constructor(taskModel, todoModel) {
        this.taskModel = taskModel;
        this.todoModel = todoModel;
    }
    async create(dto) {
        const existTodo = await this.todoModel.findById(dto.todoId);
        if (!existTodo) {
            throw new common_1.NotFoundException('Todo not found');
        }
        const maxOrderTask = await this.taskModel
            .findOne({ todo: dto.todoId, author: dto.author })
            .sort({ order: -1 })
            .exec();
        const order = maxOrderTask ? maxOrderTask.order + 1 : 1;
        const newTask = new this.taskModel(Object.assign(Object.assign({}, dto), { todo: dto.todoId, order }));
        const _a = (await newTask.save()).toJSON(), { author, todo } = _a, res = __rest(_a, ["author", "todo"]);
        return res;
    }
    async delete(dto) {
        const taskToDelete = await this.taskModel.findOne({
            _id: dto.taskId,
            author: dto.author,
        });
        if (!taskToDelete) {
            throw new common_1.NotFoundException('Task not found');
        }
        const deletedOrder = taskToDelete.order;
        const todoId = taskToDelete.todo;
        await taskToDelete.remove();
        await this.taskModel.updateMany({ todo: todoId, order: { $gt: deletedOrder } }, { $inc: { order: -1 } });
        const _a = taskToDelete.toJSON(), { author, todo } = _a, res = __rest(_a, ["author", "todo"]);
        return res;
    }
    async update(dto) {
        const { author, taskId: _id } = dto, rest = __rest(dto, ["author", "taskId"]);
        const task = await this.taskModel.findOneAndUpdate({ author, _id }, Object.assign({}, rest), { new: true });
        if (!task) {
            throw new common_1.NotFoundException(`Task not found`);
        }
        const _a = task.toJSON(), { author: dAuthor, todo: dTodo } = _a, res = __rest(_a, ["author", "todo"]);
        return res;
    }
    async swapTaskOrders(dto) {
        const tasks = await this.taskModel.find({
            _id: { $in: [dto.firstTaskId, dto.secondTaskId] },
            author: dto.author,
        });
        if (tasks.length !== 2) {
            throw new common_1.NotFoundException('One or both tasks not found or do not belong to the specified todo');
        }
        const [firstTask, secondTask] = tasks;
        if (firstTask.todo.toString() !== secondTask.todo.toString()) {
            throw new common_1.NotFoundException('Mismatched tasks');
        }
        const tempOrder = firstTask.order;
        firstTask.order = secondTask.order;
        secondTask.order = tempOrder;
        await firstTask.save();
        await secondTask.save();
        return [secondTask, firstTask];
    }
};
TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(task_model_1.TaskModel)),
    __param(1, (0, nestjs_typegoose_1.InjectModel)(todo_model_1.TodoModel)),
    __metadata("design:paramtypes", [Object, Object])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map