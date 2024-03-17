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
exports.ForgotController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const accept_forgot_dto_1 = require("./dto/accept-forgot.dto");
const get_token_forgot_dto_1 = require("./dto/get-token-forgot.dto");
const forgot_service_1 = require("./forgot.service");
let ForgotController = class ForgotController {
    constructor(ForgotService) {
        this.ForgotService = ForgotService;
    }
    async forgotGetToken(dto) {
        return this.ForgotService.forgotGetToken(dto);
    }
    async forgotAccept(dto) {
        return this.ForgotService.forgotAccept(dto);
    }
};
__decorate([
    (0, common_1.Post)('access-token'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBody)({ type: get_token_forgot_dto_1.GetTokenForgotDto }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid user' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_token_forgot_dto_1.GetTokenForgotDto]),
    __metadata("design:returntype", Promise)
], ForgotController.prototype, "forgotGetToken", null);
__decorate([
    (0, common_1.Post)('accept-token'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBody)({ type: accept_forgot_dto_1.AcceptForgotDto }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'The token is incorrect' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [accept_forgot_dto_1.AcceptForgotDto]),
    __metadata("design:returntype", Promise)
], ForgotController.prototype, "forgotAccept", null);
ForgotController = __decorate([
    (0, swagger_1.ApiTags)('Forgot password'),
    (0, common_1.Controller)('forgot'),
    __metadata("design:paramtypes", [forgot_service_1.ForgotService])
], ForgotController);
exports.ForgotController = ForgotController;
//# sourceMappingURL=forgot.controller.js.map