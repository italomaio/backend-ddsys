import { AuthService } from './auth.service';
import { IJwtPayload } from './interfaces/jwt.payload.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    index(res: any): Promise<any>;
    login(usuario: IJwtPayload): Promise<object>;
}
