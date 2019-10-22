const express = require("express");

const UserController = require("./controllers/UserController");
const DevedorController = require("./controllers/DevedorController");
const AuthController = require("./controllers/AuthController");

const authMiddleware = require("./middlewares/authenticate");

const Routes = express.Router();

Routes.post("/users", UserController.store);
Routes.post("/users/authenticate", AuthController.authenticate);
Routes.delete("/users/:user_id", UserController.delete);

Routes.use(authMiddleware);

Routes.get("/users/:user_id/devedores", DevedorController.index);
Routes.post("/users/:user_id/devedores", DevedorController.store);

module.exports = Routes;
