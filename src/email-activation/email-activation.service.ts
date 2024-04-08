import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { MailService } from './../mail/mail.service'
import { getRandom } from './../shared/utilits/getRandom'
import { UserModel } from './../user/user.model'
import { EmailActivationDto } from './dto/email-activation.dto'

@Injectable()
export class EmailActivationService {
	constructor(
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
		private configService: ConfigService,
		private mailService: MailService
	) {}

	async activationToken(_id: Types.ObjectId) {
		const lastUpdatedAt = new Date()
		lastUpdatedAt.setMinutes(
			lastUpdatedAt.getMinutes() - +this.configService.get('APP_CODE_UPDATE_AT')
		)

		const emailToken = getRandom(this.configService.get('APP_CODE_LENGTH'))

		const user = await this.UserModel.findOneAndUpdate(
			{
				_id: _id,
				emailActivate: false,
				tokenUpdatedAt: { $lte: lastUpdatedAt },
			},
			{
				emailToken: emailToken,
				tokenUpdatedAt: new Date(),
			},
			{
				timestamps: true,
			}
		)

		if (!user) {
			throw new BadRequestException('Invalid user')
		}

		this.mailService.sendUserConfirmation(
			{ email: user.email, name: user.name },
			emailToken
		)
		return { status: 'success' }
	}

	async activationAccept(dto: EmailActivationDto) {
		const user = await this.UserModel.findOneAndUpdate(
			{
				_id: dto.author,
				emailToken: (dto.emailToken || '').toUpperCase(),
				emailActivate: false,
			},
			{
				emailActivate: true,
			}
		)

		if (!user) {
			throw new BadRequestException('Invalid token')
		}
		return { status: 'success' }
	}
}
