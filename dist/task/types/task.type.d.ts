import { StatusType } from './../../shared/consts/task-status';
import { TodoType } from './../../todo/types/todo.type';
import { UserType } from './../../user/types/user.type';
export interface TaskType {
    name: string;
    stauts: StatusType;
    author: UserType;
    todo?: TodoType;
}
