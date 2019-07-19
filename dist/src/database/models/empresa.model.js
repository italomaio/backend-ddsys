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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const usuario_model_1 = require("./usuario.model");
const TableOptions = {
    tableName: 'empresa',
    freezeTableName: true,
    timestamps: false
};
let Empresa = class Empresa extends sequelize_typescript_1.Model {
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
], Empresa.prototype, "empresaId", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => usuario_model_1.default, 'empresaId'),
    __metadata("design:type", Array)
], Empresa.prototype, "usuarios", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Empresa.prototype, "razaoSocial", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Empresa.prototype, "nomeFantasia", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Empresa.prototype, "cnpj", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Endereco),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Empresa.prototype, "enderecoId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Empresa.prototype, "dominio", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Empresa.prototype, "logotipo", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Empresa.prototype, "logotipo_mini", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Tema),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Empresa.prototype, "temaId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Empresa.prototype, "ativo", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false
    }),
    __metadata("design:type", String)
], Empresa.prototype, "dataCadastro", void 0);
Empresa = __decorate([
    sequelize_typescript_1.Table(TableOptions)
], Empresa);
exports.default = Empresa;
class Endereco extends sequelize_typescript_1.Model {
}
class Tema extends sequelize_typescript_1.Model {
}
//# sourceMappingURL=empresa.model.js.map