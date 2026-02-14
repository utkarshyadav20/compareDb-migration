'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('automation_code', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            Project_id: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'Projects',
                    key: 'Project_id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            Build_id: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'Builds',
                    key: 'Build_id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            Automation_code: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            Variables: {
                type: Sequelize.JSON,
                allowNull: true,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('automation_code');
    }
};
