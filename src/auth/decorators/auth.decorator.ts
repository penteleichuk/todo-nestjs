import { applyDecorators, UseGuards } from '@nestjs/common'
import { RoleType } from './../auth.interface'
import { OnlyAdminGuard } from './../guards/admin.guard'
import { JwtAuthGuard } from './../guards/jwt.guard'

export function Auth(role: RoleType = 'user') {
	return applyDecorators(
		role === 'admin'
			? UseGuards(JwtAuthGuard, OnlyAdminGuard)
			: UseGuards(JwtAuthGuard)
	)
}
