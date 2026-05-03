'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('website_flows', {
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
        allowNull: false,
        references: {
          model: 'Builds',
          key: 'Build_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      flow_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      target_url: {
        type: Sequelize.STRING(2048),
        allowNull: false,
      },
      flow_steps: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: [],
      },
      screenshot_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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

    // Add composite index for fast project+build lookups
    await queryInterface.addIndex('website_flows', ['project_id', 'build_id'], {
      name: 'idx_website_flows_project_build',
    });

    // Add partial index for active flows
    await queryInterface.addIndex('website_flows', ['is_active'], {
      name: 'idx_website_flows_active',
      where: { is_active: true },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('website_flows');
  },
};
