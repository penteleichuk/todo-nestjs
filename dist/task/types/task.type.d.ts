import { StatusType } from './../../shared/consts/task-status';
import { TodoType } from './../../todo/types/todo.type';
import { UserType } from './../../user/types/user.type';
export declare type TaskType = {
    name: string;
    stauts: StatusType;
    author: UserType;
    todo?: TodoType;
};
