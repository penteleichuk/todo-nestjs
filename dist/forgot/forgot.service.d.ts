import { ConfigService } from '@nestjs/config';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { MailService } from './../mail/mail.service';
import { UserModel } from './../user/user.model';
import { AcceptForgotDto } from './dto/accept-forgot.dto';
import { GetTokenForgotDto } from './dto/get-token-forgot.dto';
export declare class ForgotService {
    private readonly UserModel;
    private configService;
    private mailService;
    constructor(UserModel: ModelType<UserModel>, configService: ConfigService, mailService: MailService);
    forgotGetToken(dto: GetTokenForgotDto): Promise<void>;
    forgotAccept({ forgotToken, password, email }: AcceptForgotDto): Promise<void>;
}
