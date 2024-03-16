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
exports.ForgotService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const bcryptjs_1 = require("bcryptjs");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const mail_service_1 = require("./../mail/mail.service");
const getRandom_1 = require("./../shared/utilits/getRandom");
const user_model_1 = require("./../user/user.model");
let ForgotService = class ForgotService {
    constructor(UserModel, configService, mailService) {
        this.UserModel = UserModel;
        this.configService = configService;
        this.mailService = mailService;
    }
    async forgotGetToken(dto) {
        const currentDate = new Date();
        currentDate.setMinutes(currentDate.getMinutes() - +this.configService.get('APP_CODE_UPDATE_AT'));
        const forgotToken = (0, getRandom_1.getRandom)(this.configService.get('APP_CODE_LENGTH'));
        const user = await this.UserModel.findOneAndUpdate({
            email: dto.email,
            emailActivate: true,
            tokenUpdatedAt: { $lte: currentDate },
        }, {
            forgotToken: forgotToken,
            tokenUpdatedAt: new Date(),
        }, {
            timestamps: true,
        });
        if (!user) {
            throw new common_1.BadRequestException('An error occurred.');
        }
        this.mailService.sendUserForgot({ email: user.email, name: user.name }, forgotToken);
    }
    async forgotAccept({ forgotToken, password, email }) {
        if (forgotToken.length !== +this.configService.get('APP_CODE_LENGTH')) {
            throw new common_1.BadRequestException('The token is incorrect.');
        }
        const salt = await (0, bcryptjs_1.genSalt)(10);
        const user = await this.UserModel.findOneAndUpdate({
            email: email,
            forgotToken: forgotToken,
            emailActivate: true,
        }, {
            password: await (0, bcryptjs_1.hash)(password, salt),
            forgotToken: '',
        }, {
            timestamps: true,
        });
        if (!user) {
            throw new common_1.BadRequestException('The token is incorrect.');
        }
    }
};
ForgotService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [Object, config_1.ConfigService,
        mail_service_1.MailService])
], ForgotService);
exports.ForgotService = ForgotService;
//# sourceMappingURL=forgot.service.js.map