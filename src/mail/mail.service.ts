import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { UserMailType } from './types/user.entity'

@Injectable()
export class MailService {
	constructor(private mailerService: MailerService) {}

	async sendUserConfirmation({ name, email }: UserMailType, token: string) {
		const response = await this.mailerService.sendMail({
			to: email,
			subject: 'Confirm your Email',
			template: './transactional',
			context: {
				name,
				token,
			},
		})

		return response
	}

	async sendUserForgot({ name, email }: UserMailType, token: string) {
		const response = await this.mailerService.sendMail({
			to: email,
			subject: 'Restore password',
			template: './forgot',
			context: {
				name,
				token,
			},
		})

		return response
	}
}
