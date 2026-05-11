'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('figma_flows', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      build_id: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: 'Builds',
          key: 'Build_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      project_type: {
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

    await queryInterface.addIndex('figma_flows', ['project_id', 'build_id'], {
      name: 'idx_figma_flows_project_build',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('figma_flows');
  },
};
