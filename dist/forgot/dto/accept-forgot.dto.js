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
exports.AcceptForgotDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AcceptForgotDto {
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({
        description: 'The email address associated with the user account for which the password reset is requested',
        example: 'user@example.com',
    }),
    __metadata("design:type", String)
], AcceptForgotDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, {
        message: 'The forgot token must be exactly 6 characters long',
    }),
    (0, class_validator_1.MaxLength)(6, {
        message: 'The forgot token must be exactly 6 characters long',
    }),
    (0, swagger_1.ApiProperty)({
        description: "The forgot token sent to the user's email for password reset verification",
        minLength: 6,
        maxLength: 6,
        example: '123456',
    }),
    __metadata("design:type", String)
], AcceptForgotDto.prototype, "forgotToken", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, {
        message: 'Password cannot be less than 6 characters!',
    }),
    (0, class_validator_1.MaxLength)(36, {
        message: 'Password cannot exceed 36 characters',
    }),
    (0, swagger_1.ApiProperty)({
        description: 'The new password for the user account',
        minLength: 6,
        maxLength: 36,
        example: 'newSecurePassword',
    }),
    __metadata("design:type", String)
], AcceptForgotDto.prototype, "password", void 0);
exports.AcceptForgotDto = AcceptForgotDto;
//# sourceMappingURL=accept-forgot.dto.js.map