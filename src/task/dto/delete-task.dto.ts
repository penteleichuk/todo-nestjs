import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId, IsNotEmpty } from 'class-validator'
import { Types } from 'mongoose'

export class DeleteTaskDto {
	@IsNotEmpty()
	@IsMongoId({ message: 'Task ID must be a valid MongoDB ObjectId' })
	@ApiProperty({
		description: 'The unique identifier of the task to be deleted',
		example: '507f1f77bcf86cd799439011',
		type: 'string',
	})
	taskId: string

	@IsNotEmpty()
	@IsMongoId({ message: 'Author must be a valid MongoDB ObjectId' })
	author: Types.ObjectId
}
