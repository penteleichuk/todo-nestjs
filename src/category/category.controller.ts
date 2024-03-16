import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { Auth } from './../auth/decorators/auth.decorator'
import { User } from './../user/decorators/user.decorator'
import { СategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { DeleteCategoryDto } from './dto/delete-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { CategoryType } from './types/category.type'

@ApiTags('todo')
@Controller('category')
export class СategoryController {
	constructor(private readonly categoryService: СategoryService) {}

	@Auth()
	@Post()
	@ApiBody({ type: CreateCategoryDto })
	@ApiResponse({
		status: 200,
		description: 'Create category user',
		type: Promise<CategoryType>,
	})
	async create(
		@User('_id') author: Types.ObjectId,
		@Body() dto: CreateCategoryDto
	) {
		return this.categoryService.create({ ...dto, author })
	}

	@Auth()
	@Get()
	@ApiResponse({
		status: 200,
		description: 'Get categories user',
		type: Promise<CategoryType[]>,
	})
	async getAll(@User('_id') _id: Types.ObjectId): Promise<CategoryType[]> {
		return this.categoryService.getAll(_id)
	}

	@Auth()
	@Delete()
	@ApiBody({ type: DeleteCategoryDto })
	@ApiResponse({
		status: 200,
		description: 'Delete category user',
		type: Promise<CategoryType>,
	})
	@ApiResponse({
		status: 404,
		description: 'Not found',
		type: Promise<CategoryType>,
	})
	async delete(
		@User('_id') author: Types.ObjectId,
		@Body() dto: DeleteCategoryDto
	) {
		return this.categoryService.delete({ ...dto, author })
	}

	@Auth()
	@Patch()
	@ApiBody({ type: UpdateCategoryDto })
	@ApiResponse({
		status: 200,
		description: 'Update category user',
		type: Promise<UpdateCategoryDto>,
	})
	async update(
		@User('_id') author: Types.ObjectId,
		@Body() dto: UpdateCategoryDto
	) {
		return this.categoryService.update({ ...dto, author })
	}
}
