import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { Auth } from './../auth/decorators/auth.decorator'
import { User } from './../user/decorators/user.decorator'
import { MailActivationDto } from './dto/mail-activation.dto'
import { MailActivationService } from './mail-activation.service'

@ApiTags('user')
@Controller('activation')
export class MailActivationController {
	constructor(private readonly mailActivationService: MailActivationService) {}

	@Get('token')
	@HttpCode(200)
	@Auth()
	async activationToken(@User('_id') _id: Types.ObjectId) {
		return this.mailActivationService.activationToken(_id)
	}

	@UsePipes(new ValidationPipe())
	@Post('accept')
	@HttpCode(200)
	@Auth()
	@ApiBody({ type: MailActivationDto })
	async activationAccept(
		@User('_id') author: Types.ObjectId,
		@Body() dto: MailActivationDto
	) {
		return this.mailActivationService.activationAccept({ ...dto, author })
	}
}
