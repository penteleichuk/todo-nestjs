import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { genSalt, hash } from 'bcryptjs'
import { InjectModel } from 'nestjs-typegoose'
import { MailService } from './../mail/mail.service'
import { getRandom } from './../shared/utilits/getRandom'
import { UserModel } from './../user/user.model'
import { AcceptForgotDto } from './dto/accept-forgot.dto'
import { GetTokenForgotDto } from './dto/get-token-forgot.dto'

@Injectable()
export class ForgotService {
	constructor(
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
		private configService: ConfigService,
		private mailService: MailService
	) {}

	async forgotGetToken(dto: GetTokenForgotDto) {
		const currentDate = new Date()
		currentDate.setMinutes(
			currentDate.getMinutes() - +this.configService.get('APP_CODE_UPDATE_AT')
		)

		const forgotToken = getRandom(this.configService.get('APP_CODE_LENGTH'))

		const user = await this.UserModel.findOneAndUpdate(
			{
				email: dto.email,
				emailActivate: true,
				tokenUpdatedAt: { $lte: currentDate },
			},
			{
				forgotToken: forgotToken,
				tokenUpdatedAt: new Date(),
			},
			{
				timestamps: true,
			}
		)

		if (!user) {
			throw new BadRequestException('Invalid user')
		}

		this.mailService.sendUserForgot(
			{ email: user.email, name: user.name },
			forgotToken
		)

		return { status: 'success' }
	}

	async forgotAccept({ forgotToken, password, email }: AcceptForgotDto) {
		if (forgotToken.length !== +this.configService.get('APP_CODE_LENGTH')) {
			throw new BadRequestException('The token is incorrect.')
		}

		const salt = await genSalt(10)

		const user = await this.UserModel.findOneAndUpdate(
			{
				email: email,
				forgotToken: forgotToken,
				emailActivate: true,
			},
			{
				password: await hash(password, salt),
				forgotToken: '',
			},
			{
				timestamps: true,
			}
		)

		if (!user) {
			throw new BadRequestException('The token is incorrect.')
		}

		return { status: 'success' }
	}
}
