'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the enum type first
    await queryInterface.sequelize.query(
      `CREATE TYPE "enum_sub_flows_flow_from" AS ENUM ('agent', 'plugin');`
    );

    // Add flow_from column with default 'plugin'
    await queryInterface.addColumn('sub_flows', 'flow_from', {
      type: Sequelize.ENUM('agent', 'plugin'),
      allowNull: false,
      defaultValue: 'plugin',
    });

    // Add target_website column (nullable)
    await queryInterface.addColumn('sub_flows', 'target_website', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('sub_flows', 'target_website');
    await queryInterface.removeColumn('sub_flows', 'flow_from');
    await queryInterface.sequelize.query(
      `DROP TYPE IF EXISTS "enum_sub_flows_flow_from";`
    );
  },
};
