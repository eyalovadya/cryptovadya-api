import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { WidgetsService } from './widgets.service';
import { WidgetsController } from './widgets.controller';
import { widgetsProviders } from './widgets.providers';
import { DashboardsService } from '../dashboards/dashboards.service';
import { dashboardsProviders } from '../dashboards/dashboards.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [WidgetsController],
    providers: [DashboardsService, WidgetsService, ...widgetsProviders, ...dashboardsProviders],
})
export class WidgetsModule {}
