import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { CreateTaskDto } from './dto/create-task.dto'
import { DeleteTaskDto } from './dto/delete-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { TaskModel } from './task.model'

@Injectable()
export class TaskService {
	constructor(
		@InjectModel(TaskModel) private readonly taskModel: ModelType<TaskModel>
	) {}

	async create(dto: CreateTaskDto) {
		const task = new this.taskModel({
			...dto,
			todo: dto.todoId,
		})

		const { author, todo, ...res } = (await task.save()).toJSON()

		return res
	}

	async delete(dto: DeleteTaskDto) {
		const task = await this.taskModel.findOneAndDelete({
			author: dto.author,
			_id: dto.taskId,
		})

		if (!task) {
			throw new NotFoundException(`Task not found`)
		}

		const { author, todo, ...res } = task.toJSON()

		return res
	}

	async update(dto: UpdateTaskDto) {
		const { author, taskId: _id, ...rest } = dto

		const task = await this.taskModel.findOneAndUpdate(
			{ author, _id },
			{ ...rest },
			{ new: true }
		)

		if (!task) {
			throw new NotFoundException(`Task not found`)
		}

		const { author: dAuthor, todo: dTodo, ...res } = task.toJSON()

		return res
	}
}
