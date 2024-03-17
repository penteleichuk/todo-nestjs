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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const task_status_1 = require("./../../shared/consts/task-status");
class CreateTaskDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    (0, swagger_1.ApiProperty)({
        description: 'The name of the task',
        maxLength: 120,
        example: 'Implement new feature',
    }),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)({ message: 'todo_id must be a valid MongoDB ObjectId' }),
    (0, swagger_1.ApiProperty)({
        description: 'The MongoDB ObjectId of the todo this task belongs to',
        example: '507f191e810c19729de860ea',
        type: 'string',
    }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateTaskDto.prototype, "todoId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(task_status_1.StatusType),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The status of the todo',
        enum: task_status_1.StatusType,
        example: task_status_1.StatusType.PENDING,
    }),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)({ message: 'author must be a valid MongoDB ObjectId' }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateTaskDto.prototype, "author", void 0);
exports.CreateTaskDto = CreateTaskDto;
//# sourceMappingURL=create-task.dto.js.map