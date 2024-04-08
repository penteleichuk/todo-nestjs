import { Body, Controller, Get, HttpCode, Put } from '@nestjs/common'
import { ApiBadRequestResponse, ApiBody, ApiTags } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { Auth } from './../auth/decorators/auth.decorator'
import { User } from './../user/decorators/user.decorator'
import { EmailActivationDto } from './dto/email-activation.dto'
import { EmailActivationService } from './email-activation.service'

@ApiTags('Email activation')
@Controller('email')
export class EmailActivationController {
	constructor(
		private readonly emailActivationService: EmailActivationService
	) {}

	@Get('access-token')
	@HttpCode(200)
	@Auth()
	@ApiBadRequestResponse({ description: 'Invalid user' })
	async activationToken(@User('_id') _id: Types.ObjectId) {
		return this.emailActivationService.activationToken(_id)
	}

	@Put('accept-token')
	@HttpCode(200)
	@Auth()
	@ApiBody({ type: EmailActivationDto })
	@ApiBadRequestResponse({ description: 'Invalid token' })
	async activationAccept(
		@User('_id') author: Types.ObjectId,
		@Body() dto: EmailActivationDto
	) {
		return this.emailActivationService.activationAccept({ ...dto, author })
	}
}
