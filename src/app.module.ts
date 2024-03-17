import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { AccountActivationModule } from './account-activation/account-activation.module'
import { AdminModule } from './admin/admin.module'
import { AuthModule } from './auth/auth.module'
import { ForgotModule } from './forgot/forgot.module'
import { MailModule } from './mail/mail.module'
import { getMongoDbConfig } from './shared/config/mongo.config'
import { TaskModule } from './task/task.module'
import { TodoModule } from './todo/todo.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoDbConfig,
		}),
		AuthModule,
		UserModule,
		MailModule,
		AdminModule,
		ForgotModule,
		AccountActivationModule,
		TodoModule,
		TaskModule,
	],
})
export class AppModule {}
