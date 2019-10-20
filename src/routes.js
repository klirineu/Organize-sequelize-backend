const express = require("express");
const UserController = require("./controllers/UserController");
const DevedorController = require("./controllers/DevedorController");

const Routes = express.Router();

Routes.post("/users", UserController.store);

Routes.get("/users/:user_id/devedores", DevedorController.index);
Routes.post("/users/:user_id/devedores", DevedorController.store);

module.exports = Routes;
