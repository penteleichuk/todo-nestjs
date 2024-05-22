import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'
import { ToLowerCase } from './../../shared/utilits/toLowerCase'

export class LoginDto {
	@IsEmail({
		message: 'Invalid email format.',
	})
	@ToLowerCase()
	@ApiProperty({
		description: "The user's email address.",
		example: 'user@example.com',
	})
	readonly email: string

	@IsString()
	@MinLength(6, {
		message: 'Password cannot be less than 6 characters!',
	})
	@MaxLength(36, {
		message: 'Password cannot be more than 36 characters!',
	})
	@ApiProperty({
		description:
			'The password for the user account. Must be between 6 and 36 characters.',
		example: 'SecurePassword123',
		minLength: 6,
		maxLength: 36,
	})
	readonly password: string
}
