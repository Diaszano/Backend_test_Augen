require('dotenv').config();

const mysql = {
    dialect : process.env.MYSQL_DIALECT,
    host    : process.env.MYSQL_HOST,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    logging : JSON.parse(process.env.MYSQL_LOGGING.toLowerCase()),
    define  : {
        timestamps : true,
        underscored: true
    }
};

module.exports = mysql;