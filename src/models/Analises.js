const { Model, DataTypes } = require('sequelize');

class Analises extends Model {
    static init(connection){
        super.init({
            ph         : DataTypes.FLOAT,
            cloro      : DataTypes.FLOAT,
            fluor      : DataTypes.FLOAT,
            vazao      : DataTypes.FLOAT,
            equipamento: DataTypes.INTEGER //! Corrigir, pois nn sei fazer ainda.
        },{
            sequelize: connection,
            tableName: 'analises'
        });
    }
}

module.exports = Analises;