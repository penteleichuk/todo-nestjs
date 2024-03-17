import { modelOptions, prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { StatusType } from './..//shared/consts/task-status'
import { TodoModel } from './../todo/todo.model'
import { UserModel } from './../user/user.model'

export interface TaskModel extends Base {}

@modelOptions({ schemaOptions: { versionKey: false } })
export class TaskModel extends TimeStamps {
	@prop({ required: true })
	name: string

	@prop({ required: true, enum: StatusType, default: StatusType.PENDING })
	status: StatusType

	@prop({ required: true, ref: () => UserModel })
	author: Ref<UserModel>

	@prop({ required: true, ref: () => TodoModel })
	todo: Ref<TodoModel>
}
