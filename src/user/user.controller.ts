import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { Auth } from './../auth/decorators/auth.decorator'
import { User } from './decorators/user.decorator'
import { ChangePasswordDto } from './dto/change-password.dto'
import { UserModel } from './user.model'
import { UserService } from './user.service'

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(private readonly UserService: UserService) {}

	@Get('/')
	@HttpCode(200)
	@Auth()
	@ApiCreatedResponse({
		description: 'Response user object as response.',
		type: UserModel,
	})
	async getProfile(@User('_id') _id: Types.ObjectId) {
		return this.UserService.getById(_id)
	}

	@Post('/change-password')
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@ApiBody({ type: ChangePasswordDto })
	@ApiCreatedResponse({
		description: 'Response change password user object as response.',
		type: UserModel,
	})
	async changePassword(
		@User('_id') _id: Types.ObjectId,
		@Body() dto: ChangePasswordDto
	) {
		return this.UserService.changePassword(_id, dto)
	}
}
