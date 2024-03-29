import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { UserModel } from './../user/user.model'
import { ForgotController } from './forgot.controller'
import { ForgotService } from './forgot.service'

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
