import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId, IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { Types } from 'mongoose'

export class CreateCategoryDto {
	@IsNotEmpty()
	@IsString()
	@MaxLength(120)
	@ApiProperty({
		description: 'The name of the category',
		maxLength: 120,
		example: 'Technology',
	})
	name: string

	@IsNotEmpty()
	@IsMongoId({ message: 'Author must be a valid MongoDB ObjectId' })
	author: Types.ObjectId
}
