const express = require("express");

const UserController = require("./controllers/UserController");
const UserDividasController = require("./controllers/UserDividasController");
const DevedorController = require("./controllers/DevedorController");
const DevedorDividasController = require("./controllers/DevedorDividasController");
const AuthController = require("./controllers/AuthController");

const authMiddleware = require("./middlewares/authenticate");

const Routes = express.Router();

Routes.post("/users", UserController.store);
Routes.post("/users/authenticate", AuthController.authenticate);

Routes.use(authMiddleware);

//user
Routes.put("/users/:user_id", UserController.update);
Routes.delete("/users/:user_id", UserController.delete);

//user_dividas
Routes.get("/users/:user_id/user_dividas", UserDividasController.index);
Routes.post("/users/:user_id/user_dividas", UserDividasController.store);
Routes.put(
  "/users/:user_id/user_dividas/:div_id",
  UserDividasController.update
);
Routes.delete(
  "/users/:user_id/user_dividas/:div_id",
  UserDividasController.delete
);

//devedor
Routes.get("/users/:user_id/devedores", DevedorController.index);
Routes.post("/users/:user_id/devedores", DevedorController.store);
Routes.put("/users/:user_id/devedores/:dev_id", DevedorController.update);
Routes.delete("/users/:user_id/devedores/:dev_id", DevedorController.delete);

//devedor_dividas
Routes.get(
  "/devedores/:dev_id/devedor_dividas",
  DevedorDividasController.index
);

Routes.post(
  "/devedores/:dev_id/devedor_dividas",
  DevedorDividasController.store
);

Routes.put(
  "/devedores/:dev_id/devedor_dividas/:div_id",
  DevedorDividasController.update
);

Routes.delete(
  "/devedores/:dev_id/devedor_dividas/:div_id",
  DevedorDividasController.delete
);

module.exports = Routes;
