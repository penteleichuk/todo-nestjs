import { RoleType } from './../auth.interface';
export declare function Auth(role?: RoleType): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
