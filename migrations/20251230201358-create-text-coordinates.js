'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ModelResult', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Project_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      image_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Build_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      project_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      coords_vs_text: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('ModelResult');
  }
};
