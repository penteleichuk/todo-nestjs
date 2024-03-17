"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("./../guards/jwt.guard");
function Auth(role = 'user') {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard));
}
exports.Auth = Auth;
//# sourceMappingURL=auth.decorator.js.map