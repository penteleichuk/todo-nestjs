import { Body, Controller, Get, HttpCode, Patch, Post } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { Auth } from './../auth/decorators/auth.decorator'
import { AuthResponseDto } from './../auth/dto/auth-response.dto'
import { User } from './decorators/user.decorator'
import { ChangePasswordDto } from './dto/change-password.dto'
import { UpdateProfileDto } from './dto/update-profile.dto'
import { UserModel } from './user.model'
import { UserService } from './user.service'

@ApiTags('User')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('/')
	@HttpCode(200)
	@Auth()
	@ApiCreatedResponse({
		description: 'Response user object as response.',
		type: UserModel,
	})
	async getProfile(@User('_id') _id: Types.ObjectId) {
		return this.userService.getById(_id)
	}

	@Auth()
	@Patch()
	@ApiBody({ type: UpdateProfileDto })
	@ApiCreatedResponse({
		description: 'Updating profile object as response.',
		type: UserModel,
	})
	async updateProfile(
		@User('_id') author: Types.ObjectId,
		@Body() dto: UpdateProfileDto
	) {
		return this.userService.updateProfile({ ...dto, author })
	}

	@Post('/change-password')
	@HttpCode(200)
	@Auth()
	@ApiBody({ type: ChangePasswordDto })
	@ApiCreatedResponse({
		description: 'Response change password user object as response.',
		type: AuthResponseDto,
	})
	async changePassword(
		@User('_id') _id: Types.ObjectId,
		@Body() dto: ChangePasswordDto
	) {
		return this.userService.changePassword(_id, dto)
	}
}
