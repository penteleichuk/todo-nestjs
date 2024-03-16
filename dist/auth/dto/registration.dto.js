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
exports.RegistrationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RegistrationDto {
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({
        description: 'User email address',
        example: 'user@example.com',
    }),
    __metadata("design:type", String)
], RegistrationDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2, {
        message: 'Name cannot be less than 2 characters!',
    }),
    (0, class_validator_1.MaxLength)(42),
    (0, swagger_1.ApiProperty)({
        description: 'User name',
        minLength: 2,
        maxLength: 42,
        example: 'John Doe',
    }),
    __metadata("design:type", String)
], RegistrationDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, {
        message: 'Password cannot be less than 6 characters!',
    }),
    (0, class_validator_1.MaxLength)(36),
    (0, swagger_1.ApiProperty)({
        description: 'User password',
        minLength: 6,
        maxLength: 36,
        example: 'strongPassword123',
    }),
    __metadata("design:type", String)
], RegistrationDto.prototype, "password", void 0);
exports.RegistrationDto = RegistrationDto;
//# sourceMappingURL=registration.dto.js.map