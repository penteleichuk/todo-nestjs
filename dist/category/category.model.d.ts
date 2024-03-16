import { Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { TaskModel } from './../task/task.model';
import { UserModel } from './../user/user.model';
export interface СategoryModel extends Base {
}
export declare class СategoryModel extends TimeStamps {
    name: string;
    tasks: Ref<TaskModel>[];
    author: Ref<UserModel>;
}
