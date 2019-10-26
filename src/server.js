const express = require("express");
const app = express();
app.use(express.json());

const http = require("http");
const helmet = require("helmet");
app.use(helmet());

const client = require("redis").createClient();
const limiter = require("express-limiter")(app, client);
const Limiterconfig = require("./config/limiter");
limiter(Limiterconfig);

require("dotenv-safe").config();
require("./database");

const Routes = require("./routes");

app.use(Routes);

http.createServer(app).listen(process.env.PORT);
