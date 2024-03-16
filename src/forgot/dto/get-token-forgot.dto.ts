import { ApiProperty } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'

export class GetTokenForgotDto {
	@IsEmail()
	@ApiProperty({
		description: 'The email address associated with the user account',
		example: 'user@example.com',
	})
	readonly email: string
}
