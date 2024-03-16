import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { СategoryModel } from './category.model'
import { CreateCategoryDto } from './dto/create-category.dto'
import { DeleteCategoryDto } from './dto/delete-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class СategoryService {
	constructor(
		@InjectModel(СategoryModel)
		private readonly categoryModel: ModelType<СategoryModel>
	) {}

	async create(dto: CreateCategoryDto) {
		const category = await new this.categoryModel(dto).populate([
			{ path: 'author', select: '_id name isAdmin isBanned' },
			{ path: 'tasks' },
		])

		return category.save()
	}

	async getAll(_id: Types.ObjectId): Promise<any> {
		const categories = await this.categoryModel
			.find({ author: _id })
			.sort({ createdAt: -1 })
			.populate([
				{ path: 'author', select: '_id name isAdmin isBanned' },
				{ path: 'tasks' },
			])
			.lean()
			.exec()

		return categories
	}

	async delete(dto: DeleteCategoryDto) {
		const response = await this.categoryModel.findOneAndDelete({
			author: dto.author,
			_id: dto.categoryId,
		})

		if (!response) {
			throw new NotFoundException(`Category not found`)
		}

		return response
	}

	async update(dto: UpdateCategoryDto) {
		const response = await this.categoryModel
			.findOneAndUpdate(
				{
					author: dto.author,
					_id: dto.categoryId,
				},
				{ name: dto.name },
				{ new: true }
			)
			.populate([{ path: 'author', select: '_id name isAdmin isBanned' }])

		if (!response) {
			throw new NotFoundException(`Category not found`)
		}

		return response
	}
}
