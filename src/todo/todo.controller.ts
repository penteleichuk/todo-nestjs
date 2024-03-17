import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Put,
} from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { Auth } from './../auth/decorators/auth.decorator'
import { User } from './../user/decorators/user.decorator'
import { CreateTodoDto } from './dto/create-todo.dto'
import { DeleteTodoDto } from './dto/delete-todo.dto'
import { GetByIdTodoDto } from './dto/get-byid-todo.dto'
import { SwapOrderTodoDto } from './dto/swap-order-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { TodoModel } from './todo.model'
import { TodoService } from './todo.service'

@ApiTags('Todo')
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
	@Get(':id')
	@ApiCreatedResponse({
		description: 'Get todo by id object as response.',
		type: TodoModel,
	})
	async getById(
		@User('_id') author: Types.ObjectId,
		@Param('id') dto: GetByIdTodoDto
	) {
		return this.todoService.getById({ ...dto, author })
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
	@Put('/swap-orders')
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
