import { applyDecorators, UseGuards } from '@nestjs/common'
import { RoleType } from './../auth.interface'
import { JwtAuthGuard } from './../guards/jwt.guard'

export function Auth(role: RoleType = 'user') {
	return applyDecorators(UseGuards(JwtAuthGuard))
}
