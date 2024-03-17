import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as requestIp from 'request-ip'
import { AppModule } from './app.module'

const configService = new ConfigService()

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.enableCors()
	app.setGlobalPrefix('api')
	app.use(requestIp.mw())

	const config = new DocumentBuilder()
		.setTitle('Todo doc')
		.setDescription('The todo API description')
		.setVersion('1.0')
		.addTag('todo')
		.build()
	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup('api', app, document, {
		swaggerOptions: {
			defaultModelsExpandDepth: -1, // Скрывает раздел Schemas
		},
	})

	if (configService.get('NODE_ENV') === 'development') {
		await app.listen(4221)
	} else {
		await app.listen(process.env.PORT || 80, '0.0.0.0')
	}
}

bootstrap()
