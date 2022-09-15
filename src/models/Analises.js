const { Model, DataTypes } = require('sequelize');

class Analises extends Model {
    static init(connection){
        super.init({
            ph         : DataTypes.FLOAT,
            cloro      : DataTypes.FLOAT,
            fluor      : DataTypes.FLOAT,
            vazao      : DataTypes.FLOAT,
        },{
            sequelize: connection,
            tableName: 'analises'
        });
    }
    static associate(models){
        this.belongsTo(
            models.Equipamentos, {
                foreignKey: 'equipamento_id',
                as        : 'equipamento'
            }
        );
        
    }
}

module.exports = Analises;