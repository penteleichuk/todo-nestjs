import { UserType } from 'src/user/types/user.type'
import { TaskType } from './../../task/types/task.type'

export type CategoryType = {
	name: string
	author: UserType
	tasks?: TaskType[]
}
