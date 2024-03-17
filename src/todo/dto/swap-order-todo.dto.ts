import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId, IsNotEmpty } from 'class-validator'
import { Types } from 'mongoose'

export class SwapOrderTodoDto {
	@IsNotEmpty()
	@IsMongoId({ message: 'Author must be a valid MongoDB ObjectId' })
	author: Types.ObjectId

	@IsNotEmpty()
	@IsMongoId({ message: 'firstTodoId must be a valid MongoDB ObjectId' })
	@ApiProperty({
		description: 'The MongoDB ObjectId of the todo',
		example: '507f1f77bcf86cd799439011',
	})
	firstTodoId: string

	@IsNotEmpty()
	@IsMongoId({ message: 'secondTodoId must be a valid MongoDB ObjectId' })
	@ApiProperty({
		description: 'The MongoDB ObjectId of the todo',
		example: '507f1f77bcf86cd799439011',
	})
	secondTodoId: string
}
