import { ConfigService } from '@nestjs/config';
import { Widget } from './../widgets/widget.entity';
import { Sequelize } from 'sequelize-typescript';
import { Dashboard } from './../dashboards/dashboard.entity';
import { User } from '../users/user.entity';
export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService) => {
            const databaseUrl = configService.get<string>('databaseUrl');
            const logging = configService.get<boolean>('database.logging');
            const env = configService.get<string>('NODE_ENV');

            const sslConfig =
                env === 'production'
                    ? {
                          ssl: true,
                          dialectOptions: {
                              ssl: {
                                  require: true,
                                  rejectUnauthorized: false,
                              },
                          },
                      }
                    : {};

            const sequelize = new Sequelize(databaseUrl, {
                logging,
                ...sslConfig,
            });
            sequelize.addModels([User, Dashboard, Widget]);
            await sequelize.sync();
            return sequelize;
        },
        inject: [ConfigService],
    },
];
