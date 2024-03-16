import { Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from './../user/user.model'

@Injectable()
export class AdminService {
	constructor(
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
	) {}

	async getCount() {
		return this.UserModel.find().count().exec()
	}

	async getAll(searchTerm?: string) {
		let options = {}

		if (searchTerm) {
			options = {
				$or: [
					{
						email: new RegExp(searchTerm, 'i'),
					},
				],
			}
		}

		return this.UserModel.find(options)
			.select('-password -updateAt -__v')
			.sort({ createdAt: 'desc' })
			.exec()
	}

	async delete(id: Types.ObjectId) {
		return this.UserModel.findByIdAndDelete(id).exec()
	}
}
