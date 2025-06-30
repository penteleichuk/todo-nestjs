import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import * as path from 'path'
import { AuthModule } from './auth/auth.module'
import { MailActivationModule } from './email-activation/email-activation.module'
import { ForgotModule } from './forgot/forgot.module'
import { MailModule } from './mail/mail.module'
import { getMongoDbConfig } from './shared/config/mongo.config'
import { TaskModule } from './task/task.module'
import { TodoModule } from './todo/todo.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [
				path.resolve(
					__dirname,
					`../.env.${process.env.NODE_ENV || 'development'}`
				),
				path.resolve(__dirname, '../.env'),
			],
		}),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoDbConfig,
		}),
		MailActivationModule,
		AuthModule,
		UserModule,
		ForgotModule,
		TodoModule,
		TaskModule,
		MailModule,
	],
})
export class AppModule {}
