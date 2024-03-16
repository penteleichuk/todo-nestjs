import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { MailService } from './../mail/mail.service';
import { UserModel } from './../user/user.model';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { RegistrationDto } from './dto/registration.dto';
export declare class AuthService {
    private readonly UserModel;
    private readonly jwtService;
    private mailService;
    private configService;
    constructor(UserModel: ModelType<UserModel>, jwtService: JwtService, mailService: MailService, configService: ConfigService);
    login(dto: LoginDto): Promise<{
        refreshToken: string;
        accessToken: string;
        user: any;
    }>;
    getNewTokens({ refreshToken }: RefreshTokenDto): Promise<{
        refreshToken: string;
        accessToken: string;
        user: any;
    }>;
    register({ email, name, password: currentPassword }: RegistrationDto): Promise<{
        user: any;
        refreshToken: string;
        accessToken: string;
    }>;
    validateUser({ email, password }: LoginDto): Promise<UserModel>;
    issueTokenPair(userId: string): Promise<{
        refreshToken: string;
        accessToken: string;
    }>;
    returnUserFields(user: UserModel): any;
}
