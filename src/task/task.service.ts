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
		@InjectModel(TaskModel) private readonly messageModel: ModelType<TaskModel>
	) {}

	async create(dto: CreateTaskDto) {
		const category = await new this.messageModel({
			...dto,
			category: dto.categoryId,
		}).populate([
			{
				path: 'category',
				select: 'name',
			},
			{
				path: 'author',
				select: 'name',
			},
		])

		return category.save()
	}

	async delete(dto: DeleteTaskDto) {
		const response = await this.messageModel.findOneAndDelete({
			author: dto.author,
			_id: dto.taskId,
		})

		if (!response) {
			throw new NotFoundException(`Task not found`)
		}

		return response
	}

	async update(dto: UpdateTaskDto) {
		const response = await this.messageModel
			.findOneAndUpdate(
				{
					author: dto.author,
					_id: dto.taskId,
				},
				{ name: dto.name, status: dto.status },
				{ new: true }
			)
			.populate([{ path: 'author', select: '_id name isAdmin isBanned' }])

		if (!response) {
			throw new NotFoundException(`Task not found`)
		}

		return response
	}
}
