import { MailerService } from '@nestjs-modules/mailer';
import { UserMailType } from './types/user.entity';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendUserConfirmation({ name, email }: UserMailType, token: string): Promise<any>;
    sendUserForgot({ name, email }: UserMailType, token: string): Promise<any>;
}
