import { modelOptions, prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface UserModel extends Base {}

@modelOptions({ schemaOptions: { versionKey: false } })
export class UserModel extends TimeStamps {
	@prop({ default: '', type: String })
	name: string

	@prop({ default: false, type: Boolean })
	isBanned: boolean

	@prop({ type: String })
	password: string

	@prop({ unique: true })
	email: string

	@prop({ type: String })
	emailToken: string

	@prop({ type: String })
	forgotToken: string

	@prop({ default: new Date() })
	tokenUpdatedAt: Date
}
