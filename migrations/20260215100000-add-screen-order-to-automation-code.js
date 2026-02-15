'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('automation_code', 'Screen_order', {
            type: Sequelize.JSON,
            allowNull: true,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('automation_code', 'Screen_order');
    }
};
