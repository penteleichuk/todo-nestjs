import { ApiProperty } from '@nestjs/swagger'
import { UserModel } from './../../user/user.model'

export class AuthResponseDto {
	@ApiProperty({
		description: 'User information',
		type: UserModel,
	})
	user: UserModel

	@ApiProperty({
		example:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY1OTg1MDdjNTEzNjRhMGI5Y2I4YjgiLCJpYXQiOjE3MTA3MDk0MjgsImV4cCI6MTcxMjAwNTQyOH0.IjiJ857r9XwfSD4uImvYH2mLt5AdT-QU6likAAziIn0',
		description: 'Refresh token for the User',
	})
	refreshToken: string

	@ApiProperty({
		example:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY1OTg1MDdjNTEzNjRhMGI5Y2I4YjgiLCJpYXQiOjE3MTA3MDk0MjgsImV4cCI6MTcxMDcxMzAyOH0.kMY1BSKyKX2t2WlxiFtN4jL_Yda4wQnba36N_yso9z8',
		description: 'Access token for the User',
	})
	accessToken: string
}
