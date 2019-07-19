import { Injectable, Inject } from '@nestjs/common';
import { EmpresaDto } from './dto/empresa.dto';
import Endereco from 'src/database/models/endereco.model';
import EnderecoEmpresa from 'src/database/models/association/endereco.empresa.model';
import Empresa from 'src/database/models/empresa.model';

@Injectable()
export class EmpresaService {
    constructor(
        @Inject('SEQUELIZE') private readonly bd,
        @Inject('UsuarioModel') private readonly UsuarioModel,
        @Inject('EmpresaModel') private readonly EmpresaModel,
        @Inject('EnderecoModel') private readonly EnderecoModel,
        @Inject('EnderecoEmpresaModel') private readonly EnderecoEmpresaModel,
        @Inject('CommonProvider') private readonly CommonProvider
    ) {}

    private readonly _commonProvider = new this.CommonProvider();

    public async create(empresa: EmpresaDto) : Promise<object> {
        return await this.bd.transaction(async t => {
            try {

                const _endereco = await this.EnderecoModel.create(empresa.endereco, { transaction: t });
                const _empresa  = await this.EmpresaModel.create({
                    ...empresa,
                    enderecoId: _endereco.dataValues.enderecoId
                }, { transaction: t });

                const _usuario  = await this.UsuarioModel.create({
                    empresaId: _empresa.dataValues.empresaId,
                    role: 'ADMINISTRADOR',
                    ...empresa.usuario
                }, { transaction: t });

                const _enderecoEmpresa = await this.EnderecoEmpresaModel.create({
                    enderecoId: _endereco.dataValues.enderecoId,
                    empresaId: _empresa.dataValues.empresaId
                }, { transaction: t });

                return await this._commonProvider.sendMail({
                    to: _usuario.dataValues.email,
                    html: await this._commonProvider.renderEjsTemplate(
                        await this._commonProvider.getEjsTemplate(__dirname + '/../shared/templates/email/welcome.ejs'),
                        { usuario: { email: _usuario.dataValues.email, senha: _usuario.dataValues.senha } }
                    )
                });

            } catch (error) {
                return Promise.reject(error);
            }
        });
    }

    public async update(empresa: EmpresaDto, empresaId : number) : Promise<Empresa> {
        return await this.bd.transaction(async t => {
            try {
                
                const _empresa = await this.EmpresaModel.update(empresa, { where: { empresaId: empresaId }, transaction: t });
                const _endereco = await this.EnderecoModel.bulkCreate(empresa.endereco, { updateOnDuplicate: ['enderecoId'], transaction: t });

                console.log(_endereco);
            } catch (error) {
                Promise.reject(error);
            }
        });
    }

    public async findOne(id : number) : Promise<Empresa> {
        return await this.EmpresaModel.findOne({ where: { empresaId: id }, include: [{ model: Endereco }] });
    }
}
