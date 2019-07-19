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
import Empresa from './empresa.model';
import EnderecoEmpresa from './association/endereco.empresa.model';

const TableOptions: IDefineOptions = {
    tableName: 'endereco',
    freezeTableName: true,
    timestamps: false
} as IDefineOptions;

@Table(TableOptions)
export default class Endereco extends Model<Endereco> {

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    })
    public enderecoId: number;

    @Column
    public logradouro: string;

    @Column
    public numero: number;

    @Column
    public complemento: string;

    @Column
    public estadoId: number;

    @Column
    public municipioId: number;

    @Column
    public bairro: string;

    @Column
    public cep: string;

}