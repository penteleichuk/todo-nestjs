import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { compare, genSalt, hash } from 'bcryptjs'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { ChangePasswordDto } from './dto/change-password.dto'
import { UserModel } from './user.model'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
	) {}

	async getById(_id: Types.ObjectId) {
		const user = await this.UserModel.findById(_id, {
			password: 0,
			createdAt: 0,
			emailToken: 0,
			tokenUpdatedAt: 0,
			isAdmin: 0,
			forgotToken: 0,
		})

		if (!user) {
			throw new NotFoundException('User not found')
		}

		return user
	}

	async changePassword(_id: Types.ObjectId, dto: ChangePasswordDto) {
		const user = await this.UserModel.findById(_id)

		const isValidPassword = await compare(dto.password, user.password)
		if (!isValidPassword) {
			throw new NotFoundException('Password incorect.')
		}

		if (dto.newPassword !== dto.repeatPassword) {
			throw new NotFoundException('Password double incorect.')
		}

		if (dto.password) {
			const salt = await genSalt(10)
			user.password = await hash(dto.password, salt)
		}

		const {
			_id: userId,
			name,
			email,
			updatedAt,
		} = (await user.save({ timestamps: true })).toJSON()

		return { _id: userId, name, email, updatedAt }
	}
}
