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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcryptjs_1 = require("bcryptjs");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const mail_service_1 = require("./../mail/mail.service");
const getRandom_1 = require("./../shared/utilits/getRandom");
const user_model_1 = require("./../user/user.model");
const ignoredField = {
    __v: 0,
    createdAt: 0,
    emailToken: 0,
    tokenUpdatedAt: 0,
    forgotToken: 0,
};
let AuthService = class AuthService {
    constructor(UserModel, jwtService, mailService, configService) {
        this.UserModel = UserModel;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.configService = configService;
    }
    async login(dto) {
        const user = await this.validateUser(dto);
        const tokens = await this.issueTokenPair(String(user._id));
        return Object.assign({ user: this.returnUserFields(user) }, tokens);
    }
    async getNewTokens({ refreshToken }) {
        if (!refreshToken) {
            throw new common_1.UnauthorizedException('Please sign in!');
        }
        const result = await this.jwtService.verifyAsync(refreshToken);
        if (!result) {
            throw new common_1.UnauthorizedException('Invalid token or expired!');
        }
        const user = await this.UserModel.findById(result._id);
        const tokens = await this.issueTokenPair(String(user._id));
        return Object.assign({ user: this.returnUserFields(user) }, tokens);
    }
    async register({ email, name, password: currentPassword }) {
        const isExistEmail = await this.UserModel.findOne({ email });
        if (isExistEmail) {
            throw new common_1.BadRequestException('The email is either already registered or invalid.');
        }
        const salt = await (0, bcryptjs_1.genSalt)(10);
        const emailToken = (0, getRandom_1.getRandom)(this.configService.get('APP_CODE_LENGTH'));
        const password = await (0, bcryptjs_1.hash)(currentPassword, salt);
        const newUser = new this.UserModel({
            name,
            email,
            password,
            emailToken,
        });
        await newUser.save();
        this.mailService.sendUserConfirmation({ email, name }, emailToken);
        const { refreshToken, accessToken } = await this.issueTokenPair(String(newUser._id));
        return {
            user: this.returnUserFields(newUser),
            refreshToken,
            accessToken,
        };
    }
    async validateUser({ email, password }) {
        const user = await this.UserModel.findOne({ email }, ignoredField);
        if (!user) {
            throw new common_1.BadRequestException('User not found.');
        }
        const isValidPassword = await (0, bcryptjs_1.compare)(password, user.password);
        if (!isValidPassword) {
            throw new common_1.BadRequestException('Incorrect password or email.');
        }
        return user;
    }
    async issueTokenPair(userId) {
        const data = { _id: userId };
        const refreshToken = await this.jwtService.signAsync(data, {
            expiresIn: this.configService.get('JWT_REFRESH_TOKEN'),
        });
        const accessToken = await this.jwtService.signAsync(data, {
            expiresIn: this.configService.get('JWT_ACCESS_TOKEN'),
        });
        return { refreshToken, accessToken };
    }
    returnUserFields(user) {
        const userModel = JSON.parse(JSON.stringify(user));
        const { password, emailToken, tokenUpdatedAt, createdAt, isAdmin } = userModel, spread = __rest(userModel, ["password", "emailToken", "tokenUpdatedAt", "createdAt", "isAdmin"]);
        return spread;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService,
        mail_service_1.MailService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map