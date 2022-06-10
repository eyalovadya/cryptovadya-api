import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { databaseProviders } from './database.providers';

@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}
