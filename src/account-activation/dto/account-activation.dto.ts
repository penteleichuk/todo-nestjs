import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator'
import { Types } from 'mongoose'

export class AccountActivationDto {
	@IsNotEmpty({ message: 'Email activation token must be provided' })
	@IsString({ message: 'Email activation token must be a string' })
	@ApiProperty({
		description: 'The token received via email for account activation',
		example: '123456',
	})
	emailToken: string

	@IsNotEmpty()
	@IsMongoId({ message: 'Author must be a valid MongoDB ObjectId' })
	author: Types.ObjectId
}
