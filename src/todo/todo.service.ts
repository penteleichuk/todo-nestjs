import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { CreateTodoDto } from './dto/create-todo.dto'
import { DeleteTodoDto } from './dto/delete-todo.dto'
import { SwapOrderTodoDto } from './dto/swap-order-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { TodoModel } from './todo.model'

@Injectable()
export class TodoService {
	constructor(
		@InjectModel(TodoModel)
		private readonly todoModel: ModelType<TodoModel>
	) {}

	async create(dto: CreateTodoDto) {
		const maxOrderTodo = await this.todoModel
			.findOne({ author: dto.author })
			.sort({ order: -1 })
			.exec()

		const order = maxOrderTodo ? maxOrderTodo.order + 1 : 1
		const newTodo = await new this.todoModel({ ...dto, order }).populate({
			path: 'tasks',
			select: '-author',
		})

		return newTodo.save()
	}

	async getAll(_id: Types.ObjectId) {
		const todo = await this.todoModel
			.find({ author: _id })
			.sort({ order: 1, createdAt: -1 })
			.populate({ path: 'tasks', select: '-author' })
			.exec()

		return todo
	}

	async delete(dto: DeleteTodoDto) {
		const todoToDelete = await this.todoModel.findOne({
			author: dto.author,
			_id: dto.todoId,
		})

		if (!todoToDelete) {
			throw new NotFoundException(`Todo not found`)
		}

		await todoToDelete.remove()

		await this.todoModel.updateMany(
			{ author: dto.author, order: { $gt: todoToDelete.order } },
			{ $inc: { order: -1 } }
		)

		return todoToDelete
	}

	async update(dto: UpdateTodoDto) {
		const todoToUpdate = await this.todoModel
			.findOneAndUpdate(
				{
					author: dto.author,
					_id: dto.todoId,
				},
				{ name: dto.name },
				{ new: true }
			)
			.select('-author')

		if (!todoToUpdate) {
			throw new NotFoundException(`Todo not found`)
		}

		return todoToUpdate
	}

	async swapTodoOrders(dto: SwapOrderTodoDto) {
		const firstTodo = await this.todoModel.findOne({
			author: dto.author,
			_id: dto.firstTodoId,
		})

		const secondTodo = await this.todoModel.findOne({
			author: dto.author,
			_id: dto.secondTodoId,
		})

		if (!firstTodo || !secondTodo) {
			throw new BadRequestException('One or both todos not found')
		}

		const tempOrder = firstTodo.order
		firstTodo.order = secondTodo.order
		secondTodo.order = tempOrder

		await firstTodo.save()
		await secondTodo.save()

		return [secondTodo, firstTodo]
	}
}
