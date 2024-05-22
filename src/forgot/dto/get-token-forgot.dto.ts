import { ApiProperty } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'
import { ToLowerCase } from './../../shared/utilits/toLowerCase'

export class GetTokenForgotDto {
	@IsEmail()
	@ToLowerCase()
	@ApiProperty({
		description: 'The email address associated with the user account',
		example: 'user@example.com',
	})
	readonly email: string
}
