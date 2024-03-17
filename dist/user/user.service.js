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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcryptjs_1 = require("bcryptjs");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const user_model_1 = require("./user.model");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getById(_id) {
        const user = await this.userModel.findById(_id, {
            password: 0,
            createdAt: 0,
            emailToken: 0,
            tokenUpdatedAt: 0,
            isAdmin: 0,
            forgotToken: 0,
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async changePassword(_id, dto) {
        const user = await this.userModel.findById(_id);
        if (!user) {
            throw new common_1.NotFoundException('User not found.');
        }
        const isValidPassword = await (0, bcryptjs_1.compare)(dto.password, user.password);
        if (!isValidPassword) {
            throw new common_1.BadRequestException('Incorrect password.');
        }
        if (dto.newPassword !== dto.repeatPassword) {
            throw new common_1.BadRequestException('Passwords do not match.');
        }
        if (dto.password) {
            const salt = await (0, bcryptjs_1.genSalt)(10);
            user.password = await (0, bcryptjs_1.hash)(dto.password, salt);
        }
        await user.save();
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            updatedAt: user.updatedAt,
        };
    }
    async updateProfile(dto) {
        const user = await this.userModel.findOneAndUpdate({
            _id: dto.author,
        }, { name: dto.name }, { new: true, select: '_id name email updatedAt' });
        return user;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map