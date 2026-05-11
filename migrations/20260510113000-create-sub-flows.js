'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sub_flows', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      project_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Projects',
          key: 'Project_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      section_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      section_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      flows: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: [],
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });

    await queryInterface.addIndex('sub_flows', ['project_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sub_flows');
  },
};
