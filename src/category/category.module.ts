import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { СategoryController } from './category.controller'
import { СategoryModel } from './category.model'
import { СategoryService } from './category.service'

@Module({
	controllers: [СategoryController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: СategoryModel,
				schemaOptions: {
					collection: 'Сategory',
					versionKey: false,
				},
			},
		]),
		ConfigModule,
	],
	providers: [СategoryService],
})
export class СategoryModule {}
