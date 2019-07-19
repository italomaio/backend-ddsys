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
    HasMany
} from 'sequelize-typescript';
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';
import Empresa from '../empresa.model';
import Endereco from '../endereco.model';

const TableOptions: IDefineOptions = {
    tableName: 'endereco_empresa',
    freezeTableName: true,
    timestamps: false
} as IDefineOptions;

@Table(TableOptions)
export default class EnderecoEmpresa extends Model<EnderecoEmpresa> {

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    })
    public enderecoEmpresaId: number;

    @ForeignKey(() => Endereco)
    @Column
    public enderecoId: number;

    @ForeignKey(() => Empresa)
    @Column
    public empresaId: number;

}