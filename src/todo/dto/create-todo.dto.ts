import { ApiProperty } from '@nestjs/swagger'
import {
	IsMongoId,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator'
import { Types } from 'mongoose'

export class CreateTodoDto {
	@IsOptional()
	@IsMongoId({ message: 'ID must be a valid MongoDB ObjectId' })
	@ApiProperty({
		description: 'The ID of the todo',
		example: '60c72b2f9b1e8b6a8f0e3b2b',
		required: false,
	})
	_id?: Types.ObjectId

	@IsNotEmpty()
	@IsString()
	@MaxLength(120)
	@ApiProperty({
		description: 'The name of the todo',
		maxLength: 120,
		example: 'Technology',
	})
	name: string

	@IsNotEmpty()
	@IsMongoId({ message: 'Author must be a valid MongoDB ObjectId' })
	author: Types.ObjectId
}
