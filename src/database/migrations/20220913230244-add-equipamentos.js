'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'equipamentos', { 
        id: {
          type         : Sequelize.INTEGER.UNSIGNED,
          primaryKey   : true,
          allowNull    : false,
          autoIncrement: true
        },
        nome : {
          type     : Sequelize.STRING,
          allowNull: false
        },
        cidade_id : {
          type      : Sequelize.INTEGER.UNSIGNED,
          allowNull : false,
          references: {
            model   : 'cidades',
            key     : 'id',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
          }
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
    await queryInterface.dropTable('equipamentos');
  }
};
