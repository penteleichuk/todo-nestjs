import { Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { UserModel } from 'src/user/user.model';
import { StatusType } from './..//shared/consts/task-status';
import { СategoryModel } from './../category/category.model';
export interface TaskModel extends Base {
}
export declare class TaskModel extends TimeStamps {
    name: string;
    stauts: StatusType;
    author: Ref<UserModel>;
    category: Ref<СategoryModel>;
}
