import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { Auth } from './../auth/decorators/auth.decorator'
import { User } from './../user/decorators/user.decorator'
import { CreateTodoDto } from './dto/create-todo.dto'
import { DeleteTodoDto } from './dto/delete-todo.dto'
import { SwapOrderTodoDto } from './dto/swap-order-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { TodoModel } from './todo.model'
import { TodoService } from './todo.service'

@ApiTags('todo')
@Controller('todo')
export class TodoController {
	constructor(private readonly todoService: TodoService) {}

	@Auth()
	@Post()
	@ApiBody({ type: CreateTodoDto })
	@ApiCreatedResponse({
		description: 'Created todo object as response.',
		type: TodoModel,
	})
	async create(
		@User('_id') author: Types.ObjectId,
		@Body() dto: CreateTodoDto
	) {
		return this.todoService.create({ ...dto, author })
	}

	@Auth()
	@Get()
	@ApiCreatedResponse({
		description: 'Get all todo object as response.',
		type: TodoModel,
		isArray: true,
	})
	async getAll(@User('_id') _id: Types.ObjectId) {
		return this.todoService.getAll(_id)
	}

	@Auth()
	@Delete()
	@ApiBody({ type: DeleteTodoDto })
	@ApiCreatedResponse({
		description: 'Deleted todo object as response.',
		type: TodoModel,
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
	@ApiCreatedResponse({
		description: 'Updating todo object as response.',
		type: TodoModel,
	})
	async update(
		@User('_id') author: Types.ObjectId,
		@Body() dto: UpdateTodoDto
	) {
		return this.todoService.update({ ...dto, author })
	}

	@Auth()
	@Post('/swap-orders')
	@ApiBody({ type: SwapOrderTodoDto })
	@ApiCreatedResponse({
		status: 200,
		description:
			'Returns an array of two todo objects representing swapped tasks.',
		type: TodoModel,
		isArray: true,
	})
	async swapTodoOrders(
		@User('_id') author: Types.ObjectId,
		@Body() dto: SwapOrderTodoDto
	) {
		return this.todoService.swapTodoOrders({ ...dto, author })
	}
}
