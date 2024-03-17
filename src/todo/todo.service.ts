import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { CreateTodoDto } from './dto/create-todo.dto'
import { DeleteTodoDto } from './dto/delete-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { TodoModel } from './todo.model'

@Injectable()
export class TodoService {
	constructor(
		@InjectModel(TodoModel)
		private readonly todoModel: ModelType<TodoModel>
	) {}

	async create(dto: CreateTodoDto) {
		const todo = await new this.todoModel(dto).populate([
			{ path: 'author', select: '_id name isAdmin isBanned' },
			{ path: 'tasks' },
		])

		return todo.save()
	}

	async getAll(_id: Types.ObjectId): Promise<any> {
		const todo = await this.todoModel
			.find({ author: _id })
			.sort({ createdAt: -1 })
			.populate([
				{ path: 'author', select: '_id name isAdmin isBanned' },
				{ path: 'tasks' },
			])
			.lean()
			.exec()

		return todo
	}

	async delete(dto: DeleteTodoDto) {
		const response = await this.todoModel.findOneAndDelete({
			author: dto.author,
			_id: dto.todoId,
		})

		if (!response) {
			throw new NotFoundException(`Todo not found`)
		}

		return response
	}

	async update(dto: UpdateTodoDto) {
		const response = await this.todoModel
			.findOneAndUpdate(
				{
					author: dto.author,
					_id: dto.todoId,
				},
				{ name: dto.name },
				{ new: true }
			)
			.populate([{ path: 'author', select: '_id name isAdmin isBanned' }])

		if (!response) {
			throw new NotFoundException(`Todo not found`)
		}

		return response
	}
}
