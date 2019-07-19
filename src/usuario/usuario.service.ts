import { Injectable, Inject } from '@nestjs/common';
import { UsuarioDto } from './dto/usuario.dto';
import * as jwt from 'jsonwebtoken';
import { IJwtPayload } from 'src/auth/interfaces/jwt.payload.interface';
import { Op } from 'sequelize';
import { UsuarioFilterDto } from './dto/usuario.filter.dto';
import Usuario from 'dist/src/database/models/usuario.model';

@Injectable()
export class UsuarioService {
    constructor(
        @Inject('SEQUELIZE') private readonly bd,
        @Inject('UsuarioModel') private readonly UsuarioModel,
        @Inject('EmpresaModel') private readonly EmpresaModel
    ) {}

    /**
     * @param {UsuarioDto} usuario Objeto de transferencia de dados
     * @description Metodo para criação de novo usuário
     * @returns Retorna o token do usuário logado no sistema
     */
    public async create(usuario: UsuarioDto) :Promise<Usuario> {
        try {
            return await this.bd.transaction(async transaction => {
                const _createdUser = await this.UsuarioModel.create(usuario, { returning: true, transaction });
                const token = jwt.sign({
                    id: _createdUser._id, 
                    nome: _createdUser.nome, 
                    email: _createdUser.email, 
                    empresaId: _createdUser.empresaId
                }, 'ddsys', { expiresIn: 86400 });
                return Promise.resolve({ auth: true, token });
            });
        } catch (error) {
            return Promise.reject({ auth: false, error: error.toString() });
        }
    }

    /**
     * 
     * @param {UsuarioFilterDto} usuario Objeto com os filtros aplicados
     * @description Retorna usuário(s) com base em filtros - ou não.
     * @returns {Array || Object} Retorna um array de usuarios ou null 
     */
    public async findAll(usuario : UsuarioFilterDto) : Promise<Usuario[]> {

        const filter = { where : {} };
        if (usuario.nome) {
            filter.where['nome'] = { [Op.like]: `%${usuario.nome.toLowerCase()}%` }
        } else if (usuario.email) {
            filter.where['email'] = { [Op.like]: `%${usuario.email}%` }
        } else if (usuario.empresaId) {
            filter.where['empresaId'] = usuario.empresaId;
        }

        return await this.UsuarioModel.findAll(filter);
    }

    /**
     * 
     * @param {number} id Id do usuário a ser buscado
     * @description Metodo para buscar um usuário pelo id
     * @returns {UsuarioDto} Usuário do sistema 
     */
    public async findById(id : number) : Promise<Usuario> {
        return await this.UsuarioModel.findOne({ where: { usuarioId: id } });
    }

    /**
     * 
     * @param {number} id Id do usuário a ser alterado
     * @param {UsuarioDto} usuario Objeto do usuário com as alterações
     * @description Método para alterar um usuário
     * @returns {Array} [0] se não foi alterado, [1] se foi alterado
     */
    public async update(id: number, usuario : UsuarioDto) : Promise<object> {
        return await this.UsuarioModel.update(usuario, { where: { usuarioId: id } });
    }

    /**
     * 
     * @param {number} id Id do usuário a ser deletado
     * @description Método para deletar o usuário, vai causar excessão se o 
     * usuário estiver registros no sistema.
     * @returns {boolean} true ou false
     */
    public async delete(id: number) : Promise<object> {
        return await this.UsuarioModel.destroy({ where: { usuarioId: id } });
    }

}
