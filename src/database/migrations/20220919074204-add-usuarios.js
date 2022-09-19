'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'usuarios', { 
        id: {
          type         : Sequelize.INTEGER.UNSIGNED,
          primaryKey   : true,
          allowNull    : false,
          autoIncrement: true
        },
        email : {
          type     : Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        senha : {
          type     : Sequelize.STRING,
          allowNull: false
        },
        created_at:{
          type     : Sequelize.DATE,
          allowNull: false
        },
        updated_at:{
          type     : Sequelize.DATE,
          allowNull: false
        }
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};
