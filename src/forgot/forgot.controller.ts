import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AcceptForgotDto } from './dto/accept-forgot.dto'
import { GetTokenForgotDto } from './dto/get-token-forgot.dto'
import { ForgotService } from './forgot.service'

@ApiTags('forgot password')
@Controller('forgot')
export class ForgotController {
	constructor(private readonly ForgotService: ForgotService) {}

	@Post('token')
	@HttpCode(200)
	async forgotGetToken(@Body() dto: GetTokenForgotDto) {
		return this.ForgotService.forgotGetToken(dto)
	}

	@Post('accept')
	@HttpCode(200)
	async forgotAccept(@Body() dto: AcceptForgotDto) {
		return this.ForgotService.forgotAccept(dto)
	}
}
