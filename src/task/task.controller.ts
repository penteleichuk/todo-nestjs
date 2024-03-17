import { Body, Controller, Delete, Patch, Post } from '@nestjs/common'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { Auth } from './../auth/decorators/auth.decorator'
import { User } from './../user/decorators/user.decorator'
import { CreateTaskDto } from './dto/create-task.dto'
import { DeleteTaskDto } from './dto/delete-task.dto'
import { SwapOrderTaskDto } from './dto/swap-order-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { TaskService } from './task.service'

@ApiTags('task')
@Controller('task')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Auth()
	@Post()
	@ApiBody({ type: CreateTaskDto })
	async create(
		@User('_id') author: Types.ObjectId,
		@Body() dto: CreateTaskDto
	) {
		return this.taskService.create({ ...dto, author })
	}

	@Auth()
	@Delete()
	@ApiBody({ type: DeleteTaskDto })
	async delete(
		@User('_id') author: Types.ObjectId,
		@Body() dto: DeleteTaskDto
	) {
		return this.taskService.delete({ ...dto, author })
	}

	@Auth()
	@Patch()
	@ApiBody({ type: UpdateTaskDto })
	@ApiResponse({
		status: 200,
		description: 'Update task user',
		type: UpdateTaskDto,
	})
	async update(
		@User('_id') author: Types.ObjectId,
		@Body() dto: UpdateTaskDto
	) {
		return this.taskService.update({ ...dto, author })
	}

	@Auth()
	@Post('/swap-orders')
	@ApiBody({ type: SwapOrderTaskDto })
	@ApiResponse({
		status: 200,
		description: 'Swap task orders',
		type: SwapOrderTaskDto,
	})
	async swapTodoOrders(
		@User('_id') author: Types.ObjectId,
		@Body() dto: SwapOrderTaskDto
	) {
		return this.taskService.swapTaskOrders({ ...dto, author })
	}
}
