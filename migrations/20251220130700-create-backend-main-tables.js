'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Create Projects Table
    await queryInterface.createTable('Projects', {
      Project_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      Project_Name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Project_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });

    // 2. Create Figma_screens Table
    await queryInterface.createTable('Figma_screens', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Project_id: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: 'Projects',
          key: 'Project_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      Node_Id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Figma_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Screen_Name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Extracted_image: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      Project_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });

    // 3. Create Builds Table
    await queryInterface.createTable('Builds', {
      Build_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      Project_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Build_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });

    // 4. Create Result Table
    await queryInterface.createTable('Result', {
      Project_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Projects',
          key: 'Project_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      image_name: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      diff_percent: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      result_status: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      heapmap_result: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      Build_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
    });

    // 5. Create Screenshots Table
    await queryInterface.createTable('Screenshots', {
      Build_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      Image_name: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      Project_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Screenshot: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Screenshots');
    await queryInterface.dropTable('Result');
    await queryInterface.dropTable('Builds');
    await queryInterface.dropTable('Figma_screens');
    await queryInterface.dropTable('Projects');
  }
};
