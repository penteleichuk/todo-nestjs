import { Types } from 'mongoose';
import { AccountActivationService } from './account-activation.service';
import { AccountActivationDto } from './dto/account-activation.dto';
export declare class AccountActivationController {
    private readonly AccountActivationService;
    constructor(AccountActivationService: AccountActivationService);
    activationToken(_id: Types.ObjectId): Promise<void>;
    activationAccept(author: Types.ObjectId, dto: AccountActivationDto): Promise<void>;
}
