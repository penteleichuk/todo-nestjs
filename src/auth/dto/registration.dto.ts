import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'
import { ToLowerCase } from './../../shared/utilits/toLowerCase'

export class RegistrationDto {
	@IsEmail()
	@ToLowerCase()
	@ApiProperty({
		description: 'User email address',
		example: 'user@example.com',
	})
	readonly email: string

	@IsString()
	@MinLength(2, {
		message: 'Name cannot be less than 2 characters!',
	})
	@MaxLength(42)
	@ApiProperty({
		description: 'User name',
		minLength: 2,
		maxLength: 42,
		example: 'John Doe',
	})
	readonly name: string

	@IsString()
	@MinLength(6, {
		message: 'Password cannot be less than 6 characters!',
	})
	@MaxLength(36)
	@ApiProperty({
		description: 'User password',
		minLength: 6,
		maxLength: 36,
		example: 'strongPassword123',
	})
	readonly password: string
}
