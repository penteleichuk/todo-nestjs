import { modelOptions, prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { TaskModel } from './../task/task.model'
import { UserModel } from './../user/user.model'

export interface TodoModel extends Base {}

@modelOptions({
	schemaOptions: {
		versionKey: false,
		toObject: { virtuals: true },
		toJSON: { virtuals: true },
	},
})
export class TodoModel extends TimeStamps {
	@prop({ required: true })
	name: string

	@prop({
		ref: () => TaskModel,
		foreignField: 'todo',
		localField: '_id',
		justOne: false,
	})
	tasks: Ref<TaskModel>[]

	@prop({ required: true, ref: () => UserModel })
	author: Ref<UserModel>
}
