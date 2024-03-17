import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId, IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { Types } from 'mongoose'

export class UpdateTodoDto {
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

	@IsNotEmpty()
	@IsMongoId({ message: 'Author must be a valid MongoDB ObjectId' })
	@ApiProperty({
		description: 'The MongoDB ObjectId of the todo',
		example: '507f1f77bcf86cd799439011',
	})
	todoId: string
}
