'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Builds', 'last_compared', {
            type: Sequelize.DATE,
            allowNull: true,
        });
        await queryInterface.addColumn('Builds', 'comparison_running', {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Builds', 'last_compared');
        await queryInterface.removeColumn('Builds', 'comparison_running');
    }
};
