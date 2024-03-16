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
exports.AccountActivationService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const mail_service_1 = require("../mail/mail.service");
const getRandom_1 = require("../shared/utilits/getRandom");
const user_model_1 = require("../user/user.model");
let AccountActivationService = class AccountActivationService {
    constructor(UserModel, configService, mailService) {
        this.UserModel = UserModel;
        this.configService = configService;
        this.mailService = mailService;
    }
    async activationToken(_id) {
        const lastUpdatedAt = new Date();
        lastUpdatedAt.setMinutes(lastUpdatedAt.getMinutes() - +this.configService.get('APP_CODE_UPDATE_AT'));
        const emailToken = (0, getRandom_1.getRandom)(this.configService.get('APP_CODE_LENGTH'));
        const user = await this.UserModel.findOneAndUpdate({
            _id: _id,
            emailActivate: false,
            tokenUpdatedAt: { $lte: lastUpdatedAt },
        }, {
            emailToken: emailToken,
            tokenUpdatedAt: new Date(),
        }, {
            timestamps: true,
        });
        if (!user) {
            throw new common_1.BadRequestException('Invalid token');
        }
        this.mailService.sendUserConfirmation({ email: user.email, name: user.name }, emailToken);
    }
    async activationAccept(dto) {
        const user = await this.UserModel.findOneAndUpdate({
            _id: dto.author,
            emailToken: (dto.emailToken || '').toUpperCase(),
            emailActivate: false,
        }, {
            emailActivate: true,
        });
        if (!user) {
            throw new common_1.BadRequestException('Invalid token');
        }
    }
};
AccountActivationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [Object, config_1.ConfigService,
        mail_service_1.MailService])
], AccountActivationService);
exports.AccountActivationService = AccountActivationService;
//# sourceMappingURL=account-activation.service.js.map