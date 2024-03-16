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
import { AccountActivationService } from './account-activation.service'
import { AccountActivationDto } from './dto/account-activation.dto'

@ApiTags('user')
@Controller('activation')
export class AccountActivationController {
	constructor(
		private readonly AccountActivationService: AccountActivationService
	) {}

	@Get('token')
	@HttpCode(200)
	@Auth()
	async activationToken(@User('_id') _id: Types.ObjectId) {
		return this.AccountActivationService.activationToken(_id)
	}

	@UsePipes(new ValidationPipe())
	@Post('accept')
	@HttpCode(200)
	@Auth()
	@ApiBody({ type: AccountActivationDto })
	async activationAccept(
		@User('_id') author: Types.ObjectId,
		@Body() dto: AccountActivationDto
	) {
		return this.AccountActivationService.activationAccept({ ...dto, author })
	}
}
