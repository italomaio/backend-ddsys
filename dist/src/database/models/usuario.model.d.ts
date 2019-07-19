import { Model } from 'sequelize-typescript';
import Empresa from './empresa.model';
export default class Usuario extends Model<Usuario> {
    usuarioId: number;
    empresaId: number;
    empresa: Empresa;
    nome: string;
    role: string;
    email: string;
    senha: string;
    dataCadastro: string;
    static hashPassword(user: Usuario, options: any): Promise<void>;
}
