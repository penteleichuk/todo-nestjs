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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("mongoose");
const auth_decorator_1 = require("./../auth/decorators/auth.decorator");
const user_decorator_1 = require("./../user/decorators/user.decorator");
const create_task_dto_1 = require("./dto/create-task.dto");
const delete_task_dto_1 = require("./dto/delete-task.dto");
const swap_order_task_dto_1 = require("./dto/swap-order-task.dto");
const update_task_dto_1 = require("./dto/update-task.dto");
const task_model_1 = require("./task.model");
const task_service_1 = require("./task.service");
let TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    async create(author, dto) {
        return this.taskService.create(Object.assign(Object.assign({}, dto), { author }));
    }
    async delete(author, dto) {
        return this.taskService.delete(Object.assign(Object.assign({}, dto), { author }));
    }
    async update(author, dto) {
        return this.taskService.update(Object.assign(Object.assign({}, dto), { author }));
    }
    async swapTodoOrders(author, dto) {
        return this.taskService.swapTaskOrders(Object.assign(Object.assign({}, dto), { author }));
    }
};
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ type: create_task_dto_1.CreateTaskDto }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Created task object as response.',
        type: task_model_1.TaskModel,
    }),
    __param(0, (0, user_decorator_1.User)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "create", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Delete)(),
    (0, swagger_1.ApiBody)({ type: delete_task_dto_1.DeleteTaskDto }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Deleted task object as response.',
        type: task_model_1.TaskModel,
    }),
    __param(0, (0, user_decorator_1.User)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, delete_task_dto_1.DeleteTaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "delete", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Patch)(),
    (0, swagger_1.ApiBody)({ type: update_task_dto_1.UpdateTaskDto }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Updating task object as response.',
        type: task_model_1.TaskModel,
    }),
    __param(0, (0, user_decorator_1.User)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, update_task_dto_1.UpdateTaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "update", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Post)('/swap-orders'),
    (0, swagger_1.ApiBody)({ type: swap_order_task_dto_1.SwapOrderTaskDto }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Returns an array of two task objects representing swapped tasks.',
        type: task_model_1.TaskModel,
        isArray: true,
    }),
    __param(0, (0, user_decorator_1.User)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, swap_order_task_dto_1.SwapOrderTaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "swapTodoOrders", null);
TaskController = __decorate([
    (0, swagger_1.ApiTags)('task'),
    (0, common_1.Controller)('task'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map