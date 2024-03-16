import { ConfigService } from '@nestjs/config';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { MailService } from '../mail/mail.service';
import { UserModel } from '../user/user.model';
import { AccountActivationDto } from './dto/account-activation.dto';
export declare class AccountActivationService {
    private readonly UserModel;
    private configService;
    private mailService;
    constructor(UserModel: ModelType<UserModel>, configService: ConfigService, mailService: MailService);
    activationToken(_id: Types.ObjectId): Promise<void>;
    activationAccept(dto: AccountActivationDto): Promise<void>;
}
