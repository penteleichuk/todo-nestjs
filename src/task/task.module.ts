import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { TaskController } from './task.controller'
import { TaskModel } from './task.model'
import { TaskService } from './task.service'

@Module({
	controllers: [TaskController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: TaskModel,
				schemaOptions: {
					collection: 'Task',
					versionKey: false,
				},
			},
		]),
		ConfigModule,
	],
	providers: [TaskService],
})
export class TaskModule {}
