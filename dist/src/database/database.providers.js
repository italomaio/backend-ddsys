"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
exports.databaseProviders = [{
        provide: 'SEQUELIZE',
        useFactory: () => __awaiter(this, void 0, void 0, function* () {
            const sequelize = new sequelize_typescript_1.Sequelize({
                dialect: 'mysql',
                host: '127.0.0.1',
                port: 3306,
                username: 'root',
                password: '@Brelogok7',
                database: 'ddsys',
                timezone: '-03:00',
                modelPaths: [__dirname + '/models'],
                modelMatch: (filename, member) => {
                    return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
                },
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                }
            });
            yield sequelize.sync();
            return sequelize;
        })
    }];
//# sourceMappingURL=database.providers.js.map