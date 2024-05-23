import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { compare, genSalt, hash } from 'bcryptjs'
import { InjectModel } from 'nestjs-typegoose'
import { MailService } from './../mail/mail.service'
import { getRandom } from './../shared/utilits/getRandom'
import { UserModel } from './../user/user.model'
import { LoginDto } from './dto/login.dto'
import { RefreshTokenDto } from './dto/refreshToken.dto'
import { RegistrationDto } from './dto/registration.dto'

const ignoredField = {
	__v: 0,
	createdAt: 0,
	emailToken: 0,
	tokenUpdatedAt: 0,
	forgotToken: 0,
}

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
		private readonly jwtService: JwtService,
		private mailService: MailService,
		private configService: ConfigService
	) {}

	async login(dto: LoginDto) {
		const user = await this.validateUser(dto)

		const tokens = await this.issueTokenPair(String(user._id))
		return {
			user: this.returnUserFields(user),
			...tokens,
		}
	}

	async getNewTokens({ refreshToken }: RefreshTokenDto) {
		if (!refreshToken) {
			throw new UnauthorizedException('Please sign in!')
		}

		const result = await this.jwtService.verifyAsync(refreshToken)
		if (!result) {
			throw new UnauthorizedException('Invalid token or expired!')
		}

		const user = await this.UserModel.findById(result._id)
		const tokens = await this.issueTokenPair(String(user._id))

		return {
			user: this.returnUserFields(user),
			...tokens,
		}
	}

	async register({ email, name, password: currentPassword }: RegistrationDto) {
		const isExistEmail = await this.UserModel.findOne({
			email: email.toLowerCase(),
		})
		if (isExistEmail) {
			throw new BadRequestException(
				'The email is either already registered or invalid.'
			)
		}

		const salt = await genSalt(10)
		const emailToken = getRandom(this.configService.get('APP_CODE_LENGTH'))
		const password = await hash(currentPassword, salt)

		const newUser = new this.UserModel({
			name,
			email: email.toLowerCase(),
			password,
			emailToken,
		})

		await newUser.save()

		this.mailService.sendUserConfirmation(
			{ email: email.toLowerCase(), name },
			emailToken
		)
		const { refreshToken, accessToken } = await this.issueTokenPair(
			String(newUser._id)
		)

		return {
			user: this.returnUserFields(newUser),
			refreshToken,
			accessToken,
		}
	}

	async validateUser({ email, password }: LoginDto): Promise<UserModel> {
		const user = await this.UserModel.findOne(
			{ email: email.toLowerCase() },
			ignoredField
		)

		if (!user) {
			throw new BadRequestException('User not found.')
		}

		const isValidPassword = await compare(password, user.password)
		if (!isValidPassword) {
			throw new BadRequestException('Incorrect password or email.')
		}

		return user
	}

	async issueTokenPair(userId: string) {
		const data = { _id: userId }

		const refreshToken = await this.jwtService.signAsync(data, {
			expiresIn: this.configService.get('JWT_REFRESH_TOKEN'),
		})

		const accessToken = await this.jwtService.signAsync(data, {
			expiresIn: this.configService.get('JWT_ACCESS_TOKEN'),
		})

		return { refreshToken, accessToken }
	}

	returnUserFields(user: UserModel) {
		const userModel = JSON.parse(JSON.stringify(user))
		const {
			password,
			emailToken,
			tokenUpdatedAt,
			createdAt,
			isAdmin,
			...spread
		} = userModel

		return spread
	}
}
