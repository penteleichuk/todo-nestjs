import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { RegistrationDto } from './dto/registration.dto';
export declare class AuthController {
    private readonly AuthService;
    constructor(AuthService: AuthService);
    login(dto: LoginDto): Promise<{
        refreshToken: string;
        accessToken: string;
        user: any;
    }>;
    getNewTokens(dto: RefreshTokenDto): Promise<{
        refreshToken: string;
        accessToken: string;
        user: any;
    }>;
    register(dto: RegistrationDto): Promise<{
        user: any;
        refreshToken: string;
        accessToken: string;
    }>;
}
