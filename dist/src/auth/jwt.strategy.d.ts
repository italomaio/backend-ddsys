import { IJwtPayload } from "./interfaces/jwt.payload.interface";
import { AuthService } from "./auth.service";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(payload: IJwtPayload): Promise<any>;
}
export {};
