import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId, IsNotEmpty } from 'class-validator'
import { Types } from 'mongoose'

export class UpdateProfileDto {
	@IsNotEmpty()
	@ApiProperty({
		description: 'New name for the user',
		example: 'Vasyl',
	})
	name: string

	@IsNotEmpty()
	@IsMongoId({ message: 'Author must be a valid MongoDB ObjectId' })
	author: Types.ObjectId
}
