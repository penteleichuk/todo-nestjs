import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class AcceptForgotDto {
	@IsEmail()
	@ApiProperty({
		description:
			'The email address associated with the user account for which the password reset is requested',
		example: 'user@example.com',
	})
	readonly email: string

	@IsString()
	@MinLength(6, {
		message: 'The forgot token must be exactly 6 characters long',
	})
	@MaxLength(6, {
		message: 'The forgot token must be exactly 6 characters long',
	})
	@ApiProperty({
		description:
			"The forgot token sent to the user's email for password reset verification",
		minLength: 6,
		maxLength: 6,
		example: '123456',
	})
	readonly forgotToken: string

	@IsString()
	@MinLength(6, {
		message: 'Password cannot be less than 6 characters!',
	})
	@MaxLength(36, {
		message: 'Password cannot exceed 36 characters',
	})
	@ApiProperty({
		description: 'The new password for the user account',
		minLength: 6,
		maxLength: 36,
		example: 'newSecurePassword',
	})
	readonly password: string
}
