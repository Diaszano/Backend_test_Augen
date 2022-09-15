'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'analises', { 
        id: {
          type         : Sequelize.INTEGER.UNSIGNED,
          primaryKey   : true,
          allowNull    : false,
          autoIncrement: true
        },
        ph : {
          type     : Sequelize.FLOAT,
          allowNull: false
        },
        cloro : {
          type     : Sequelize.FLOAT,
          allowNull: false
        },
        fluor : {
          type     : Sequelize.FLOAT,
          allowNull: false
        },
        vazao : {
          type     : Sequelize.FLOAT,
          allowNull: false
        },
        equipamento_id : {
          type      : Sequelize.INTEGER.UNSIGNED,
          allowNull : false,
          references: {
            model   : 'equipamentos',
            key     : 'id',
            onUpdate: 'RESTRICT',
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
    await queryInterface.dropTable('analises');
  }
};
