import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { ConfigModule } from '@nestjs/config'
import { ForgotController } from './forgot.controller'
import { ForgotService } from './forgot.service'
import { UserModel } from '../user/user.model'

@Module({
	controllers: [ForgotController],
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
	providers: [ForgotService],
})
export class ForgotModule {}
