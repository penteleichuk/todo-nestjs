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
exports.AccountActivationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("mongoose");
const auth_decorator_1 = require("./../auth/decorators/auth.decorator");
const user_decorator_1 = require("./../user/decorators/user.decorator");
const account_activation_service_1 = require("./account-activation.service");
const account_activation_dto_1 = require("./dto/account-activation.dto");
let AccountActivationController = class AccountActivationController {
    constructor(AccountActivationService) {
        this.AccountActivationService = AccountActivationService;
    }
    async activationToken(_id) {
        return this.AccountActivationService.activationToken(_id);
    }
    async activationAccept(author, dto) {
        return this.AccountActivationService.activationAccept(Object.assign(Object.assign({}, dto), { author }));
    }
};
__decorate([
    (0, common_1.Get)('token'),
    (0, common_1.HttpCode)(200),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, user_decorator_1.User)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], AccountActivationController.prototype, "activationToken", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)('accept'),
    (0, common_1.HttpCode)(200),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiBody)({ type: account_activation_dto_1.AccountActivationDto }),
    __param(0, (0, user_decorator_1.User)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, account_activation_dto_1.AccountActivationDto]),
    __metadata("design:returntype", Promise)
], AccountActivationController.prototype, "activationAccept", null);
AccountActivationController = __decorate([
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.Controller)('activation'),
    __metadata("design:paramtypes", [account_activation_service_1.AccountActivationService])
], AccountActivationController);
exports.AccountActivationController = AccountActivationController;
//# sourceMappingURL=account-activation.controller.js.map