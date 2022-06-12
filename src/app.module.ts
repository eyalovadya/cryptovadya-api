import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';
import { DashboardsModule } from './dashboards/dashboards.module';
import { WidgetsModule } from './widgets/widgets.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './shared/config/configuration';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        UsersModule,
        SharedModule,
        DashboardsModule,
        WidgetsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
