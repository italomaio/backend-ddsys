import { IJwtPayload } from './interfaces/jwt.payload.interface';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly UsuarioModel;
    private readonly EmpresaModel;
    private readonly jwtService;
    constructor(UsuarioModel: any, EmpresaModel: any, jwtService: JwtService);
    login(usuario: IJwtPayload): Promise<object>;
    validarUsuario(payload: IJwtPayload): Promise<any>;
}
