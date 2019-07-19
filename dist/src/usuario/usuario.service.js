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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
let UsuarioService = class UsuarioService {
    constructor(bd, UsuarioModel, EmpresaModel) {
        this.bd = bd;
        this.UsuarioModel = UsuarioModel;
        this.EmpresaModel = EmpresaModel;
    }
    create(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.bd.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
                    const _createdUser = yield this.UsuarioModel.create(usuario, { returning: true, transaction });
                    const token = jwt.sign({
                        id: _createdUser._id,
                        nome: _createdUser.nome,
                        email: _createdUser.email,
                        empresaId: _createdUser.empresaId
                    }, 'ddsys', { expiresIn: 86400 });
                    return Promise.resolve({ auth: true, token });
                }));
            }
            catch (error) {
                return Promise.reject({ auth: false, error: error.toString() });
            }
        });
    }
};
UsuarioService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('SEQUELIZE')),
    __param(1, common_1.Inject('UsuarioModel')),
    __param(2, common_1.Inject('EmpresaModel')),
    __metadata("design:paramtypes", [Object, Object, Object])
], UsuarioService);
exports.UsuarioService = UsuarioService;
//# sourceMappingURL=usuario.service.js.map