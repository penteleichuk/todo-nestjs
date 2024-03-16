import { Controller, Delete, Get, HttpCode, Param, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { Auth } from './../auth/decorators/auth.decorator'
import { IdValidationPipe } from './../shared/pipes/id.validation.pipe'
import { UserService } from './../user/user.service'
import { AdminService } from './admin.service'

@ApiTags('admin')
@Controller('admin')
export class AdminController {
	constructor(
		private readonly AdminService: AdminService,
		private readonly UserService: UserService
	) {}

	@Get('users/count')
	@Auth('admin')
	async getCountUsers() {
		return this.AdminService.getCount()
	}

	@Get('users')
	@Auth('admin')
	async getUsers(@Query('searchTerm') searchTerm?: string) {
		return this.AdminService.getAll(searchTerm)
	}

	@Get('user/:id')
	@Auth('admin')
	async getUser(@Param('id', IdValidationPipe) id: Types.ObjectId) {
		return this.UserService.getById(id)
	}

	@Delete('user/delete/:id')
	@HttpCode(200)
	@Auth('admin')
	async deleteUser(@Param('id', IdValidationPipe) id: Types.ObjectId) {
		return this.AdminService.delete(id)
	}
}
