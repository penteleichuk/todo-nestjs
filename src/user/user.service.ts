import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { compare, genSalt, hash } from 'bcryptjs'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { AuthService } from './../auth/auth.service'
import { ChangePasswordDto } from './dto/change-password.dto'
import { UpdateProfileDto } from './dto/update-profile.dto'
import { UserModel } from './user.model'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
		private authServivce: AuthService
	) {}

	async getById(_id: Types.ObjectId) {
		const user = await this.userModel.findById(_id, {
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
		const user = await this.userModel.findById(_id)

		if (!user) {
			throw new NotFoundException('User not found.')
		}

		const isValidPassword = await compare(dto.password, user.password)
		if (!isValidPassword) {
			throw new BadRequestException('Incorrect password.')
		}

		if (dto.newPassword !== dto.repeatPassword) {
			throw new BadRequestException('Passwords do not match.')
		}

		if (dto.newPassword) {
			const salt = await genSalt(10)
			user.password = await hash(dto.newPassword, salt)
		}

		await user.save()

		const tokens = await this.authServivce.issueTokenPair(String(user._id))

		return {
			user: this.authServivce.returnUserFields(user),
			...tokens,
		}
	}

	async updateProfile(dto: UpdateProfileDto) {
		const user = await this.userModel.findOneAndUpdate(
			{
				_id: dto.author,
			},
			{ name: dto.name },
			{ new: true, select: '_id name email updatedAt' }
		)

		return user
	}
}
