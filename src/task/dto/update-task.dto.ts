import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	IsMongoId,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator'
import { Types } from 'mongoose'
import { StatusType } from './../../shared/consts/task-status'

export class UpdateTaskDto {
	@IsNotEmpty()
	@IsString()
	@MaxLength(120)
	@ApiProperty({
		description: 'The name of the task',
		maxLength: 120,
		example: 'Implement new feature',
	})
	name: string

	@IsNotEmpty()
	@IsMongoId({ message: 'taskId must be a valid MongoDB ObjectId' })
	@ApiProperty({
		description: 'The MongoDB ObjectId of the task this task belongs to',
		example: '507f191e810c19729de860ea',
	})
	taskId: string

	@IsOptional()
	@ApiPropertyOptional({
		description: 'The status of the task',
		enum: StatusType,
		example: StatusType.IN_PROGRESS,
	})
	status: StatusType

	@IsNotEmpty()
	@IsMongoId({ message: 'author must be a valid MongoDB ObjectId' })
	author: Types.ObjectId
}
