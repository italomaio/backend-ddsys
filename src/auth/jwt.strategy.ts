import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtPayload } from "./interfaces/jwt.payload.interface";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'ddsys'
        });
    }

    async validate(payload: AuthDto) {
        const user = this.authService.validarUsuario(payload);
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}