import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { EntitiesModule } from './entities.module';

@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
    imports: [EntitiesModule],
})
export class DatabaseModule {}
