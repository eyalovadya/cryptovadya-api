'use strict';

const sql = `
    create table "users" (
        "id" uuid, 
        "email" varchar(255) unique, 
        "password" varchar(255), 
        "first_name" varchar(255), 
        "last_name" varchar(255), 
        "created_at" timestamp with time zone, 
        "updated_at" timestamp with time zone, 
        "deleted_at" timestamp with time zone, 
        primary key ("id")
    );
`;

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.sequelize.query(sql),
    down: (queryInterface, Sequelize) => {},
};
