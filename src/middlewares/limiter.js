const express = require("express");
const app = express();
const client = require("redis").createClient();
const limiter = require("express-limiter")(app, client);
const Limiterconfig = require("../config/limiter");

const ll = limiter(Limiterconfig);

module.exports = ll;
