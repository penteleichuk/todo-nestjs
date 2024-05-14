import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { TaskModel } from './../task/task.model'
import { CreateTodoDto } from './dto/create-todo.dto'
import { DeleteTodoDto } from './dto/delete-todo.dto'
import { GetByIdTodoDto } from './dto/get-byid-todo.dto'
import { SwapOrderTodoDto } from './dto/swap-order-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { TodoModel } from './todo.model'

@Injectable()
export class TodoService {
	constructor(
		@InjectModel(TaskModel) private readonly taskModel: ModelType<TaskModel>,
		@InjectModel(TodoModel) private readonly todoModel: ModelType<TodoModel>
	) {}

	async create(dto: CreateTodoDto) {
		const maxOrderTodo = await this.todoModel
			.findOne({ author: dto.author })
			.sort({ order: -1 })
			.exec()

		const _id = dto._id || new Types.ObjectId()

		const order = maxOrderTodo ? maxOrderTodo.order + 1 : 1
		const newTodo = await new this.todoModel({ ...dto, _id, order }).populate({
			path: 'tasks',
			select: '-author',
		})

		const { author, ...res } = (await newTodo.save()).toJSON()
		return res
	}

	async getById(dto: GetByIdTodoDto) {
		const todo = await this.todoModel
			.findOne({ author: dto.author, _jd: dto.todoId }, '-author')
			.sort({ order: 1, createdAt: -1 })
			.populate({
				path: 'tasks',
				select: '-author',
				options: { sort: { order: 1 } },
			})
			.exec()

		return todo
	}

	async getAll(_id: Types.ObjectId) {
		const todo = await this.todoModel
			.find({ author: _id }, '-author')
			.sort({ order: 1, createdAt: -1 })
			.populate({
				path: 'tasks',
				select: '-author',
				options: { sort: { order: 1 } },
			})
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

		await this.taskModel.deleteMany({
			todo: dto.todoId,
		})

		const { author, ...res } = todoToDelete.toJSON()
		return res
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

		const { author, ...res } = todoToUpdate.toJSON()
		return res
	}

	async swapTodoOrders(dto: SwapOrderTodoDto) {
		const firstTodo = await this.todoModel
			.findOne({
				author: dto.author,
				_id: dto.firstTodoId,
			})
			.select('-author')

		const secondTodo = await this.todoModel
			.findOne({
				author: dto.author,
				_id: dto.secondTodoId,
			})
			.select('-author')

		if (!firstTodo || !secondTodo) {
			throw new BadRequestException('One or both todos not found')
		}

		const tempOrder = firstTodo.order
		firstTodo.order = secondTodo.order
		secondTodo.order = tempOrder

		const responseFirst = await firstTodo.save()
		const responseSecond = await secondTodo.save()

		const { author: _first, ...resFirst } = responseFirst.toJSON()
		const { author: _second, ...resSecond } = responseSecond.toJSON()

		return [resFirst, resSecond]
	}
}
