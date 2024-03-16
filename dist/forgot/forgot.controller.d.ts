import { AcceptForgotDto } from './dto/accept-forgot.dto';
import { GetTokenForgotDto } from './dto/get-token-forgot.dto';
import { ForgotService } from './forgot.service';
export declare class ForgotController {
    private readonly ForgotService;
    constructor(ForgotService: ForgotService);
    forgotGetToken(dto: GetTokenForgotDto): Promise<void>;
    forgotAccept(dto: AcceptForgotDto): Promise<void>;
}
