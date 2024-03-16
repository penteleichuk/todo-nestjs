import { UserType } from 'src/user/types/user.type'
import { CategoryType } from './../../category/types/category.type'
import { StatusType } from './../../shared/consts/task-status'

export interface TaskType {
	name: string
	stauts: StatusType
	author: UserType
	category?: CategoryType
}
