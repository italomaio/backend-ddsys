import { Sequelize } from 'sequelize-typescript'

export const databaseProviders = [{
    provide: 'SEQUELIZE',
    useFactory: async () => {
        const sequelize = new Sequelize({
            dialect: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            username: 'root',
            password: '@Brelogok7',
            database: 'ddsys',
            timezone: '-03:00',
            modelPaths: [__dirname + '/models', __dirname + '/models/association' ],
            modelMatch: (filename, member) => {
                return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
            },
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        })
        await sequelize.sync();
        return sequelize;
    }
}]