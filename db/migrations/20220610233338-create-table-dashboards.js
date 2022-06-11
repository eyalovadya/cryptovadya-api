'use strict';

const sql = `
    create table "dashboards" (
        "id" serial, 
        "user_id" uuid,
        "title" varchar(255), 
        "created_at" timestamp with time zone, 
        "updated_at" timestamp with time zone, 
        "deleted_at" timestamp with time zone, 
        primary key ("id"),
        foreign key ("user_id") references users("id")
    );
`;

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.sequelize.query(sql),
    down: (queryInterface, Sequelize) => {},
};
