const { Model, DataTypes } = require('sequelize');

class Cidades extends Model {
    static init(connection){
        super.init({
            nome: DataTypes.STRING
        },{
            sequelize: connection,
            tableName: 'cidades'
        });
    }
    static associate(models){
        this.hasMany(
            models.Equipamentos, {
                foreignKey: 'cidade_id',
                as: 'equipamentos'
            }
        );
        
    }
}

module.exports = Cidades;