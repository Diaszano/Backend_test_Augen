const { Model, DataTypes } = require('sequelize');

class Equipamentos extends Model {
    static init(connection){
        super.init({
            nome  : DataTypes.STRING,  //! Corrigir, pois nn sei fazer ainda.
        },{
            sequelize: connection,
            tableName: 'equipamentos'
        });
    }

    static associate(models){
        this.belongsTo(
            models.Cidades, {
                foreignKey: 'cidade_id',
                as: 'cidade'
            }
        );
        
    }
}

module.exports = Equipamentos;