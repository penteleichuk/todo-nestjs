import { ApiProperty } from '@nestjs/swagger'
import { modelOptions, prop, Ref } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Types } from 'mongoose'
import { TaskModel } from './../task/task.model'
import { UserModel } from './../user/user.model'

export interface Base {
	_id: Types.ObjectId
}

export interface TodoModel extends Base {}

@modelOptions({
	schemaOptions: {
		versionKey: false,
		toJSON: {
			virtuals: true,
			transform: (_, ret) => {
				delete ret.id
				return ret
			},
		},
	},
})
export class TodoModel extends TimeStamps implements Base {
	@ApiProperty({
		example: '65f73d3ec53f4aa7e8939696',
		description: 'Unique identifier for the Task',
	})
	@prop({ required: true })
	_id: Types.ObjectId

	@ApiProperty({
		example: 'My Todo',
		description: 'Name of the Todo',
	})
	@prop({ required: true })
	name: string

	@ApiProperty({
		example: 1,
		description: 'Order of the Todo in the list',
	})
	@prop({ required: true, type: Number })
	order: number

	@prop({ required: true, ref: () => UserModel })
	author: Ref<UserModel>

	@ApiProperty({
		description: 'List of tasks associated with the Todo',
		type: () => [TaskModel],
	})
	@prop({
		ref: () => TaskModel,
		foreignField: 'todo',
		localField: '_id',
		justOne: false,
	})
	tasks: Ref<TaskModel>[]

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
