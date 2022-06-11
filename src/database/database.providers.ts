import { Sequelize } from 'sequelize-typescript';
import { Dashboard } from './../dashboards/dashboard.entity';
import { User } from '../users/user.entity';
import { ConfigService } from './../shared/config/config.service';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize(configService.sequelizeOrmConfig);
            sequelize.addModels([User, Dashboard]);
            await sequelize.sync();
            return sequelize;
        },
        inject: [ConfigService],
    },
];
