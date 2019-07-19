"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var Usuario_1;
const bcrypt = require("bcrypt");
const moment = require("moment");
const sequelize_typescript_1 = require("sequelize-typescript");
const empresa_model_1 = require("./empresa.model");
const TableOptions = {
    tableName: 'usuario',
    freezeTableName: true,
    timestamps: false
};
let Usuario = Usuario_1 = class Usuario extends sequelize_typescript_1.Model {
    static hashPassword(user, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!options.transaction)
                throw new Error('Missing transaction.');
            user.senha = bcrypt.hashSync(user.senha, 8);
        });
    }
};
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    }),
    __metadata("design:type", Number)
], Usuario.prototype, "usuarioId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => empresa_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Usuario.prototype, "empresaId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => empresa_model_1.default),
    __metadata("design:type", empresa_model_1.default)
], Usuario.prototype, "empresa", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Usuario.prototype, "nome", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Usuario.prototype, "role", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.CHAR(100),
        allowNull: false,
        validate: {
            isEmail: true,
            isUnique: (value, next) => __awaiter(this, void 0, void 0, function* () {
                const isExist = yield Usuario_1.findOne({ where: { email: value } });
                if (isExist) {
                    const error = 'user:create:emailAlreadyExist';
                    next(error);
                }
                next();
            })
        }
    }),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false
    }),
    __metadata("design:type", String)
], Usuario.prototype, "senha", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: moment().toLocaleString()
    }),
    __metadata("design:type", String)
], Usuario.prototype, "dataCadastro", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Usuario, Object]),
    __metadata("design:returntype", Promise)
], Usuario, "hashPassword", null);
Usuario = Usuario_1 = __decorate([
    sequelize_typescript_1.Table(TableOptions)
], Usuario);
exports.default = Usuario;
//# sourceMappingURL=usuario.model.js.map