const express = require("express");
const UserController = require("./controllers/UserController");

const Routes = express.Router();

Routes.post("/users", UserController.store);

module.exports = Routes;
