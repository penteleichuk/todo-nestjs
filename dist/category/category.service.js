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
exports.СategoryService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const category_model_1 = require("./category.model");
let СategoryService = class СategoryService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    async create(dto) {
        const category = await new this.categoryModel(dto).populate([
            { path: 'author', select: '_id name isAdmin isBanned' },
            { path: 'tasks' },
        ]);
        return category.save();
    }
    async getAll(_id) {
        const categories = await this.categoryModel
            .find({ author: _id })
            .sort({ createdAt: -1 })
            .populate([
            { path: 'author', select: '_id name isAdmin isBanned' },
            { path: 'tasks' },
        ])
            .lean()
            .exec();
        return categories;
    }
    async delete(dto) {
        const response = await this.categoryModel.findOneAndDelete({
            author: dto.author,
            _id: dto.categoryId,
        });
        if (!response) {
            throw new common_1.NotFoundException(`Category not found`);
        }
        return response;
    }
    async update(dto) {
        const response = await this.categoryModel
            .findOneAndUpdate({
            author: dto.author,
            _id: dto.categoryId,
        }, { name: dto.name }, { new: true })
            .populate([{ path: 'author', select: '_id name isAdmin isBanned' }]);
        if (!response) {
            throw new common_1.NotFoundException(`Category not found`);
        }
        return response;
    }
};
СategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(category_model_1.СategoryModel)),
    __metadata("design:paramtypes", [Object])
], СategoryService);
exports.СategoryService = СategoryService;
//# sourceMappingURL=category.service.js.map