import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';
import { DashboardsModule } from './dashboards/dashboards.module';

@Module({
    imports: [UsersModule, SharedModule, DashboardsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
