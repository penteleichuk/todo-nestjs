import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { UserModel } from './../user/user.model'
import { MailActivationController } from './mail-activation.controller'
import { MailActivationService } from './mail-activation.service'

@Module({
	controllers: [MailActivationController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: 'User',
				},
			},
		]),
		ConfigModule,
	],
	providers: [MailActivationService],
})
export class MailActivationModule {}
