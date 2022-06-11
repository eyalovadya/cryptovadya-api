'use strict';

'use strict';

const sql = `
  alter table "dashboards" alter column "title" type varchar(60);
`;

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.sequelize.query(sql),
    down: (queryInterface, Sequelize) => {},
};
