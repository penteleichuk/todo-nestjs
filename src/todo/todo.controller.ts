import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { Auth } from './../auth/decorators/auth.decorator'
import { User } from './../user/decorators/user.decorator'
import { CreateTodoDto } from './dto/create-todo.dto'
import { DeleteTodoDto } from './dto/delete-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { TodoService } from './todo.service'
import { TodoType } from './types/todo.type'

@ApiTags('todo')
@Controller('todo')
export class TodoController {
	constructor(private readonly todoService: TodoService) {}

	@Auth()
	@Post()
	@ApiBody({ type: CreateTodoDto })
	@ApiResponse({
		status: 200,
		description: 'Create todo user',
		type: Promise<TodoType>,
	})
	async create(
		@User('_id') author: Types.ObjectId,
		@Body() dto: CreateTodoDto
	) {
		return this.todoService.create({ ...dto, author })
	}

	@Auth()
	@Get()
	@ApiResponse({
		status: 200,
		description: 'Get todo user',
		type: Promise<TodoType[]>,
	})
	async getAll(@User('_id') _id: Types.ObjectId): Promise<TodoType[]> {
		return this.todoService.getAll(_id)
	}

	@Auth()
	@Delete()
	@ApiBody({ type: DeleteTodoDto })
	@ApiResponse({
		status: 200,
		description: 'Delete todo user',
		type: Promise<DeleteTodoDto>,
	})
	@ApiResponse({
		status: 404,
		description: 'Not found',
		type: Promise<DeleteTodoDto>,
	})
	async delete(
		@User('_id') author: Types.ObjectId,
		@Body() dto: DeleteTodoDto
	) {
		return this.todoService.delete({ ...dto, author })
	}

	@Auth()
	@Patch()
	@ApiBody({ type: UpdateTodoDto })
	@ApiResponse({
		status: 200,
		description: 'Update todo user',
		type: Promise<UpdateTodoDto>,
	})
	async update(
		@User('_id') author: Types.ObjectId,
		@Body() dto: UpdateTodoDto
	) {
		return this.todoService.update({ ...dto, author })
	}
}
