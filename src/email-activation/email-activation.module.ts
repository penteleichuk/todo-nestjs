import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { UserModel } from './../user/user.model'
import { EmailActivationController } from './email-activation.controller'
import { EmailActivationService } from './email-activation.service'

@Module({
	controllers: [EmailActivationController],
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
	providers: [EmailActivationService],
})
export class MailActivationModule {}
