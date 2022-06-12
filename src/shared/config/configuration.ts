import { Options, Dialect } from 'sequelize';

export default () => {
    const database: Options = {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        dialect: (process.env.DATABASE_DIALECT as Dialect) || 'postgres',
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        logging: !!parseInt(process.env.SEQUELIZE_LOGGING_FLAG, 10) || false,
    };

    return {
        cryptovadyaUiUrl: process.env.CRYPTOVADYA_UI_URL,
        port: parseInt(process.env.PORT, 10) || 4000,
        database,
        databaseUrl: process.env.DATABASE_URL,
        jwtSecret: process.env.JWT_SECRET,
    };
};
