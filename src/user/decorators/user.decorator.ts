import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserModel } from './../user.model'

type UserDataType = keyof UserModel

export const User = createParamDecorator(
	(data: UserDataType, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
		const user = request.user

		return data ? user[data] : user
	}
)
