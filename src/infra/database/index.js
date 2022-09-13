const Sequelize = require("sequelize");
const dbConfig  = require("../../config/database");

const connection = new Sequelize(dbConfig);

// const Produto    = require("../models/Produto");
// Produto.init(connection);

module.exports = connection;