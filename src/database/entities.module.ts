import { Module } from '@nestjs/common';
import { entitiesProvider } from './entities.provider';

@Module({
    providers: [...entitiesProvider],
    exports: [...entitiesProvider]
})
export class EntitiesModule {}
