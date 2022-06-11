import { Module } from '@nestjs/common';
import { DatabaseModule } from './../database/database.module';
import { DashboardsService } from './dashboards.service';
import { DashboardsController } from './dashboards.controller';
import { dashboardsProviders } from './dashboards.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [DashboardsController],
    providers: [DashboardsService, ...dashboardsProviders],
})
export class DashboardsModule {}
