require('dotenv').config();
module.exports = {
    development: {
        dialect: 'postgres',
        use_env_variable: 'DATABASE_URL',
        logging: !!parseInt(process.env.SEQUELIZE_LOGGING_FLAG, 10) || false,
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: process.env.DATABASE_DIALECT || 'postgres',
        logging: !!parseInt(process.env.SEQUELIZE_LOGGING_FLAG, 10) || false,
        ssl: true,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
};
