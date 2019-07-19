import { Model } from 'sequelize-typescript';
import Usuario from './usuario.model';
export default class Empresa extends Model<Empresa> {
    empresaId: number;
    usuarios: Usuario[];
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
    enderecoId: number;
    dominio: string;
    logotipo: string;
    logotipo_mini: string;
    temaId: number;
    ativo: boolean;
    dataCadastro: string;
}
