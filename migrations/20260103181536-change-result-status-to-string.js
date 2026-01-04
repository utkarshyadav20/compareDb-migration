'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Change type to STRING (this casts 0 -> '0', 1 -> '1')
    await queryInterface.changeColumn('Result', 'result_status', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // 2. Map existing values
    await queryInterface.sequelize.query(
      `UPDATE "Result" SET "result_status" = 'pass' WHERE "result_status" = '1'`
    );
    await queryInterface.sequelize.query(
      `UPDATE "Result" SET "result_status" = 'fail' WHERE "result_status" = '0'`
    );
  },

  async down(queryInterface, Sequelize) {
    // 1. Revert values
    await queryInterface.sequelize.query(
      `UPDATE "Result" SET "result_status" = '1' WHERE "result_status" = 'pass'`
    );
    await queryInterface.sequelize.query(
      `UPDATE "Result" SET "result_status" = '0' WHERE "result_status" = 'fail'`
    );
    
    // 2. Change type back to INTEGER
    // Note: USING is needed because column contains strings now
    await queryInterface.changeColumn('Result', 'result_status', {
      type: Sequelize.INTEGER,
      allowNull: true,
      using: 'result_status::integer' 
    });
  }
};
