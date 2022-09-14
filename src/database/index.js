const Sequelize = require("sequelize");
const dbConfig  = require("../config/database");

const connection = new Sequelize(dbConfig);

const Cidades      = require("../models/Cidades");
const Analises     = require("../models/Analises");
const Equipamentos = require("../models/Equipamentos");

Cidades.init(connection);
Analises.init(connection);
Equipamentos.init(connection);

Equipamentos.associate(connection.models);

module.exports = connection;