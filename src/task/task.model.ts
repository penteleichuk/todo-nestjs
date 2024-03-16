import { modelOptions, prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { UserModel } from 'src/user/user.model'
import { StatusType } from './..//shared/consts/task-status'
import { СategoryModel } from './../category/category.model'

export interface TaskModel extends Base {}

@modelOptions({ schemaOptions: { versionKey: false } })
export class TaskModel extends TimeStamps {
	@prop({ required: true })
	name: string

	@prop({ required: true, default: StatusType.IN_PROGRESS })
	stauts: StatusType

	@prop({ required: true, ref: () => UserModel })
	author: Ref<UserModel>

	@prop({ required: true, ref: () => СategoryModel })
	category: Ref<СategoryModel>
}
