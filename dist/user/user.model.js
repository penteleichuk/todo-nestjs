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
exports.UserModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
let UserModel = class UserModel extends defaultClasses_1.TimeStamps {
};
__decorate([
    (0, typegoose_1.prop)({ default: '', type: String }),
    __metadata("design:type", String)
], UserModel.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false, type: Boolean }),
    __metadata("design:type", Boolean)
], UserModel.prototype, "isBanned", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], UserModel.prototype, "password", void 0);
__decorate([
    (0, typegoose_1.prop)({ unique: true }),
    __metadata("design:type", String)
], UserModel.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], UserModel.prototype, "emailToken", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], UserModel.prototype, "forgotToken", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: new Date() }),
    __metadata("design:type", Date)
], UserModel.prototype, "tokenUpdatedAt", void 0);
UserModel = __decorate([
    (0, typegoose_1.modelOptions)({ schemaOptions: { versionKey: false } })
], UserModel);
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map