import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    HasOne,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    BeforeValidate,
    BeforeCreate,
    BelongsTo
} from 'sequelize-typescript';
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';
import Empresa from './empresa.model';

const TableOptions: IDefineOptions = {
    tableName: 'usuario',
    freezeTableName: true,
    timestamps: false
} as IDefineOptions;

@Table(TableOptions)
export default class Usuario extends Model<Usuario> {

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    })
    public usuarioId: number;

    @ForeignKey(() => Empresa)
    @Column
    empresaId: number;

    @BelongsTo(() => Empresa)
    empresa: Empresa;

    @Column
    nome: string;

    @Column
    role: string;

    @Column({
        type: DataType.CHAR(100),
        allowNull: false,
        validate: {
            isEmail: true,
            isUnique: async (value: string, next: Function): Promise<any> => {
                const isExist = await Usuario.findOne({ where: { email: value } });
                if (isExist) {
                    const error = 'user:create:emailAlreadyExist';
                    next(error);
                }
                next();
            }
        }
    })
    public email: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    public senha: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: moment().toISOString()
    })
    public dataCadastro: string;

    @BeforeCreate
    public static async hashPassword(user: Usuario, options: any) {
        if (!options.transaction) throw new Error('Missing transaction.');
        user.senha = bcrypt.hashSync(user.senha, 8);
    }

}