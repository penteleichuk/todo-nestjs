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
exports.СategoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("mongoose");
const auth_decorator_1 = require("./../auth/decorators/auth.decorator");
const user_decorator_1 = require("./../user/decorators/user.decorator");
const category_service_1 = require("./category.service");
const create_category_dto_1 = require("./dto/create-category.dto");
const delete_category_dto_1 = require("./dto/delete-category.dto");
const update_category_dto_1 = require("./dto/update-category.dto");
let СategoryController = class СategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async create(author, dto) {
        return this.categoryService.create(Object.assign(Object.assign({}, dto), { author }));
    }
    async getAll(_id) {
        return this.categoryService.getAll(_id);
    }
    async delete(author, dto) {
        return this.categoryService.delete(Object.assign(Object.assign({}, dto), { author }));
    }
    async update(author, dto) {
        return this.categoryService.update(Object.assign(Object.assign({}, dto), { author }));
    }
};
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ type: create_category_dto_1.CreateCategoryDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Create category user',
        type: (Promise),
    }),
    __param(0, (0, user_decorator_1.User)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], СategoryController.prototype, "create", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get categories user',
        type: (Promise),
    }),
    __param(0, (0, user_decorator_1.User)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], СategoryController.prototype, "getAll", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Delete)(),
    (0, swagger_1.ApiBody)({ type: delete_category_dto_1.DeleteCategoryDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Delete category user',
        type: (Promise),
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not found',
        type: (Promise),
    }),
    __param(0, (0, user_decorator_1.User)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, delete_category_dto_1.DeleteCategoryDto]),
    __metadata("design:returntype", Promise)
], СategoryController.prototype, "delete", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Patch)(),
    (0, swagger_1.ApiBody)({ type: update_category_dto_1.UpdateCategoryDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Update category user',
        type: (Promise),
    }),
    __param(0, (0, user_decorator_1.User)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], СategoryController.prototype, "update", null);
СategoryController = __decorate([
    (0, swagger_1.ApiTags)('todo'),
    (0, common_1.Controller)('category'),
    __metadata("design:paramtypes", [category_service_1.СategoryService])
], СategoryController);
exports.СategoryController = СategoryController;
//# sourceMappingURL=category.controller.js.map