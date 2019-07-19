import * as crypto from 'crypto';
import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    BeforeValidate,
    BeforeCreate,
    HasMany,
    BelongsToMany
} from 'sequelize-typescript';
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';
import Usuario from './usuario.model';
import Endereco from './endereco.model';
import EnderecoEmpresa from './association/endereco.empresa.model';
import moment = require('moment');

const TableOptions: IDefineOptions = {
    tableName: 'empresa',
    freezeTableName: true,
    timestamps: false
} as IDefineOptions;

@Table(TableOptions)
export default class Empresa extends Model<Empresa> {

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    })
    public empresaId: number;

    @HasMany(() => Usuario, 'empresaId')
    usuarios: Usuario[];

    @BelongsToMany(() => Endereco, () => EnderecoEmpresa)
    endereco: Endereco[];

    @Column
    public razaoSocial: string;

    @Column
    public nomeFantasia: string;

    @Column
    public cnpj: string;

    @ForeignKey(() => Endereco)
    @Column
    public enderecoId: number;

    @Column
    public dominio: string;

    @Column
    public logotipo: string;

    @Column
    public logotipo_mini: string;

    @ForeignKey(() => Tema)
    @Column
    public temaId: number;

    @Column
    public ativo: boolean;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: moment().toISOString()
    })
    public dataCadastro: string;

}

class Tema extends Model<Tema> {}