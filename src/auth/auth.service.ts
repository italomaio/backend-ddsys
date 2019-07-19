import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IJwtPayload } from './interfaces/jwt.payload.interface';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject('UsuarioModel') private readonly UsuarioModel,
        @Inject('EmpresaModel') private readonly EmpresaModel,
        private readonly jwtService : JwtService
    ) {}

    /**
     * @param {AuthDto} usuario Objeto de transferencia de dados
     * @description Metodo para login de usuário
     * @returns Retorna o token do usuário logado no sistema
     */
    public async login(usuario: AuthDto) :Promise<object> {
        try {
            const user = await this.UsuarioModel.findOne({ where: { email: usuario.email }, include: [{ model: this.EmpresaModel }] });
            if (!user || !bcrypt.compareSync(usuario.senha, user.senha)) {
                throw new HttpException("A Senha digitada não é válida!", HttpStatus.UNAUTHORIZED);
            }
            const token = this.jwtService.sign({
                id: user._id, 
                nome: user.nome, 
                email: user.email, 
                empresaId: user.empresaId,
                usuarioId: user.usuarioId,
                empresa: user.empresa
            });
            user['senha'] = null;
            return Promise.resolve({ auth: true, token, user });
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 
     * @param {IJwtPayload} payload Payload decifrado pelo JWT
     * @description Metodo para o AuthGuard validar o usuário
     * @returns Retorna um usuário do sistema de acordo com o payload
     */
    public async validarUsuario(payload: IJwtPayload) : Promise<any> {
        return await this.UsuarioModel.findOne({ where: { email: payload.email } });
    }
}
