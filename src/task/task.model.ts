import { ApiProperty } from '@nestjs/swagger'
import { modelOptions, prop, Ref } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Types } from 'mongoose'
import { StatusType } from './..//shared/consts/task-status'
import { TodoModel } from './../todo/todo.model'
import { UserModel } from './../user/user.model'

export interface Base {
	_id: Types.ObjectId
}

export interface TaskModel extends Base {}

@modelOptions({ schemaOptions: { versionKey: false } })
export class TaskModel extends TimeStamps {
	@ApiProperty({
		example: '65f73d3ec53f4aa7e8939696',
		description: 'Unique identifier for the Task',
	})
	@prop({ required: true })
	_id: Types.ObjectId

	@ApiProperty({ example: 'My work', description: 'Display task name' })
	@prop({ required: true })
	name: string

	@ApiProperty({
		description: 'Status of the task',
		enum: StatusType,
		default: StatusType.NOT_DONE,
	})
	@prop({ required: true, enum: StatusType, default: StatusType.NOT_DONE })
	status: StatusType

	@prop({ required: true, ref: () => UserModel })
	author: Ref<UserModel>

	@ApiProperty({ example: 1, description: 'Order of the task within its Todo' })
	@prop({ required: true, type: Number })
	order: number

	@prop({ required: true, ref: () => TodoModel })
	todo: Ref<TodoModel>

	@ApiProperty({
		description: 'Timestamp of when the task was created',
		type: Date,
	})
	createdAt: Date

	@ApiProperty({
		description: 'Timestamp of the last update to the task',
		type: Date,
	})
	updatedAt: Date
}
