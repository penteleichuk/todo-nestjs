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
		const todo = await new this.todoModel(dto).populate({
			path: 'tasks',
			select: '-author',
		})
		return todo.save()
	}

	async getAll(_id: Types.ObjectId) {
		const todo = await this.todoModel
			.find({ author: _id })
			.sort({ createdAt: -1 })
			.populate({ path: 'tasks', select: '-author' })
			.exec()

		return todo
	}

	async delete(dto: DeleteTodoDto) {
		const todo = await this.todoModel
			.findOneAndDelete({
				author: dto.author,
				_id: dto.todoId,
			})
			.select('-author')

		if (!todo) {
			throw new NotFoundException(`Todo not found`)
		}

		return todo
	}

	async update(dto: UpdateTodoDto) {
		const todo = await this.todoModel
			.findOneAndUpdate(
				{
					author: dto.author,
					_id: dto.todoId,
				},
				{ name: dto.name },
				{ new: true }
			)
			.select('-author')

		if (!todo) {
			throw new NotFoundException(`Todo not found`)
		}

		return todo
	}
}
