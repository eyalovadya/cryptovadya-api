'use strict';

const sql = `
    create table "widgets" (
        "id" serial, 
        "dashboard_id" int,
        "type" varchar(50), 
        "data" jsonb,
        "created_at" timestamp with time zone, 
        "updated_at" timestamp with time zone, 
        "deleted_at" timestamp with time zone, 
        primary key ("id"),
        foreign key ("dashboard_id") references dashboards("id")
    );
`;

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.sequelize.query(sql),
    down: (queryInterface, Sequelize) => {},
};
