import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { ConfigModule } from '@nestjs/config'
import { AccountActivationController } from './account-activation.controller'
import { AccountActivationService } from './account-activation.service'
import { UserModel } from '../user/user.model'

@Module({
	controllers: [AccountActivationController],
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
	providers: [AccountActivationService],
})
export class AccountActivationModule {}
