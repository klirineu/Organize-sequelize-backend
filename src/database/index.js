const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../models/User");
const Devedores = require("../models/Devedores");
const DevedorDividas = require("../models/DevedorDividas");
const UserDividas = require("../models/UserDividas");

const connection = new Sequelize(dbConfig);

User.init(connection);
UserDividas.init(connection);
Devedores.init(connection);
DevedorDividas.init(connection);

User.associate(connection.models);
UserDividas.associate(connection.models);
Devedores.associate(connection.models);
DevedorDividas.associate(connection.models);

module.exports = connection;
