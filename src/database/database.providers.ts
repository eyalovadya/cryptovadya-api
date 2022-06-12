import { Options } from 'sequelize';
import { ConfigService } from '@nestjs/config';
import { Widget } from './../widgets/widget.entity';
import { Sequelize } from 'sequelize-typescript';
import { Dashboard } from './../dashboards/dashboard.entity';
import { User } from '../users/user.entity';
export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService) => {
            const databaseUrl = configService.get<Options>('databaseUrl');
            const sequelize = new Sequelize(databaseUrl);
            sequelize.addModels([User, Dashboard, Widget]);
            await sequelize.sync();
            return sequelize;
        },
        inject: [ConfigService],
    },
];
