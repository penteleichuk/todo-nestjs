import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { TodoController } from './todo.controller'
import { TodoModel } from './todo.model'
import { TodoService } from './todo.service'

@Module({
	controllers: [TodoController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: TodoModel,
				schemaOptions: {
					collection: 'Todo',
					versionKey: false,
				},
			},
		]),
		ConfigModule,
	],
	providers: [TodoService],
})
export class TodoModule {}
