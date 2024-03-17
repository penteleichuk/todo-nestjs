import { ApiProperty } from '@nestjs/swagger'
import { modelOptions, prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Types } from 'mongoose'

export interface UserModel extends Base {}

@modelOptions({ schemaOptions: { versionKey: false } })
export class UserModel extends TimeStamps {
	@ApiProperty({
		example: '65f73d3ec53f4aa7e8939696',
		description: 'Unique identifier for the User',
	})
	_id: Types.ObjectId

	@ApiProperty({
		example: 'Vasyl',
		description: 'Name of the User',
	})
	@prop({ default: '', type: String })
	name: string

	@prop({ type: String })
	password: string

	@ApiProperty({
		example: 'admin@gmail.com',
		description: 'Email of the User',
	})
	@prop({ unique: true })
	email: string

	@ApiProperty({
		example: false,
		description: 'Indicates whether the email of the User has been activated',
		default: false,
	})
	@prop({ type: Boolean, default: false })
	emailActivate: boolean

	@prop({ type: String })
	emailToken: string

	@prop({ type: String })
	forgotToken: string

	@prop({ default: new Date() })
	tokenUpdatedAt: Date

	@ApiProperty({
		example: '2024-03-16T13:02:08.365Z',
		description: 'Last update time of the User',
	})
	updatedAt: Date
}
