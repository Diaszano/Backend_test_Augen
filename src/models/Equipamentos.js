const { Model, DataTypes } = require('sequelize');

class Equipamentos extends Model {
    static init(connection){
        super.init({
            nome: DataTypes.STRING,
        },{
            sequelize: connection,
            tableName: 'equipamentos'
        });
    }

    static associate(models){
        this.belongsTo(
            models.Cidades, {
                foreignKey: 'cidade_id',
                as        : 'cidade'
            }
        );
        this.hasMany(
            models.Analises, {
                foreignKey: 'equipamento_id',
                as        : 'analises'
            }
        );
        
    }
}

module.exports = Equipamentos;