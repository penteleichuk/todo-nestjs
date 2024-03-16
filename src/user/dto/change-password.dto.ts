import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class ChangePasswordDto {
	@IsNotEmpty()
	@ApiProperty({
		description: 'Current password of the user',
		example: 'currentPassword123',
	})
	readonly password: string

	@IsNotEmpty()
	@ApiProperty({
		description: 'New password for the user',
		example: 'newStrongPassword123',
	})
	readonly newPassword: string

	@IsNotEmpty()
	@ApiProperty({
		description: 'Repeat of the new password for confirmation',
		example: 'newStrongPassword123',
	})
	readonly repeatPassword: string
}
