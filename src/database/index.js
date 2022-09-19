const Sequelize = require("sequelize");
const dbConfig  = require("../config/database");

const connection = new Sequelize(dbConfig);

const Cidades      = require("../models/Cidades");
const Usuarios     = require("../models/Usuarios");
const Analises     = require("../models/Analises");
const Equipamentos = require("../models/Equipamentos");

Cidades.init(connection);
Usuarios.init(connection);
Analises.init(connection);
Equipamentos.init(connection);

Cidades.associate(connection.models);
Analises.associate(connection.models);
Equipamentos.associate(connection.models);

module.exports = connection;