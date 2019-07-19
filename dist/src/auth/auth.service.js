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
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(UsuarioModel, EmpresaModel, jwtService) {
        this.UsuarioModel = UsuarioModel;
        this.EmpresaModel = EmpresaModel;
        this.jwtService = jwtService;
    }
    login(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.UsuarioModel.findOne({ where: { email: usuario.email }, include: [{ model: this.EmpresaModel }] });
                if (!user || !bcrypt.compareSync(usuario.senha, user.senha)) {
                    throw new common_1.HttpException("A Senha digitada não é válida!", common_1.HttpStatus.UNAUTHORIZED);
                }
                const token = this.jwtService.sign({
                    id: user._id,
                    nome: user.nome,
                    email: user.email,
                    empresaId: user.empresaId,
                    usuarioId: user.usuarioId,
                    empresa: user.empresa
                });
                user['senha'] = null;
                return Promise.resolve({ auth: true, token: token, usuario: user });
            }
            catch (error) {
                throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    validarUsuario(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.UsuarioModel.findOne({ where: { email: payload.email } });
        });
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('UsuarioModel')),
    __param(1, common_1.Inject('EmpresaModel')),
    __metadata("design:paramtypes", [Object, Object, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map