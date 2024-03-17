import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { Auth } from './../auth/decorators/auth.decorator'
import { User } from './../user/decorators/user.decorator'
import { CreateTodoDto } from './dto/create-todo.dto'
import { DeleteTodoDto } from './dto/delete-todo.dto'
import { SwapOrderTodoDto } from './dto/swap-order-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { TodoService } from './todo.service'

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
	})
	async getAll(@User('_id') _id: Types.ObjectId) {
		return this.todoService.getAll(_id)
	}

	@Auth()
	@Delete()
	@ApiBody({ type: DeleteTodoDto })
	@ApiResponse({
		status: 200,
		description: 'Delete todo user',
		type: DeleteTodoDto,
	})
	@ApiResponse({
		status: 404,
		description: 'Not found',
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
		type: UpdateTodoDto,
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
	@ApiResponse({
		status: 200,
		description: 'Swap todo orders',
		type: SwapOrderTodoDto,
	})
	async swapTodoOrders(
		@User('_id') author: Types.ObjectId,
		@Body() dto: SwapOrderTodoDto
	) {
		return this.todoService.swapTodoOrders({ ...dto, author })
	}
}
