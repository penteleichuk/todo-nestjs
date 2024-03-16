import { modelOptions, prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { TaskModel } from './../task/task.model'
import { UserModel } from './../user/user.model'

export interface СategoryModel extends Base {}

@modelOptions({
	schemaOptions: {
		versionKey: false,
		toObject: { virtuals: true },
		toJSON: { virtuals: true },
	},
})
export class СategoryModel extends TimeStamps {
	@prop({ required: true })
	name: string

	@prop({
		ref: () => TaskModel,
		foreignField: 'category',
		localField: '_id',
		justOne: false,
	})
	tasks: Ref<TaskModel>[]

	@prop({ required: true, ref: () => UserModel })
	author: Ref<UserModel>
}
