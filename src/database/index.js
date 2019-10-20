const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../models/User");
const Devedores = require("../models/Devedores");

const connection = new Sequelize(dbConfig);

User.init(connection);
Devedores.init(connection);

User.associate(connection.models);
Devedores.associate(connection.models);

module.exports = connection;
