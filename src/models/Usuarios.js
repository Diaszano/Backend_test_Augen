const { Model, DataTypes } = require('sequelize');

class Usuarios extends Model {
    static init(connection){
        super.init({
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
        },{
            sequelize: connection,
            tableName: 'usuarios'
        });
    }
}

module.exports = Usuarios;