import {
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthResponseDto } from './dto/auth-response.dto'
import { LoginDto } from './dto/login.dto'
import { RefreshTokenDto } from './dto/refreshToken.dto'
import { RegistrationDto } from './dto/registration.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly AuthService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	@ApiBody({ type: LoginDto })
	@ApiResponse({
		status: 200,
		description: 'Auth user object as response.',
		type: AuthResponseDto,
	})
	async login(@Body() dto: LoginDto) {
		return this.AuthService.login(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('access-token')
	@ApiBody({ type: RefreshTokenDto })
	@ApiResponse({
		status: 200,
		description: 'Refetch user object as response.',
		type: AuthResponseDto,
	})
	async getNewTokens(@Body() dto: RefreshTokenDto) {
		return this.AuthService.getNewTokens(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('register')
	@ApiBody({ type: RegistrationDto })
	@ApiResponse({
		status: 200,
		description: 'Register user object as response.',
		type: AuthResponseDto,
	})
	async register(@Body() dto: RegistrationDto) {
		return this.AuthService.register(dto)
	}
}
