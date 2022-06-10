const configDev = require('./config/config.development');
const configProd = require('./config/config.production');

module.exports = process.env.NODE_ENV === 'production' ? configProd : configDev;
