import { TaskType } from './../../task/types/task.type'
import { UserType } from './../../user/types/user.type'

export type TodoType = {
	name: string
	author: UserType
	tasks?: TaskType[]
}
