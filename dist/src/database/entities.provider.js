"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_model_1 = require("./models/usuario.model");
const empresa_model_1 = require("./models/empresa.model");
exports.entitiesProvider = [
    {
        provide: 'UsuarioModel',
        useValue: usuario_model_1.default
    },
    {
        provide: 'EmpresaModel',
        useValue: empresa_model_1.default
    }
];
//# sourceMappingURL=entities.provider.js.map