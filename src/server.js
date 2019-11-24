const express = require("express");
const app = express();
app.use(express.json());

const server = require("http").Server(app);
const helmet = require("helmet");
app.use(helmet());

/*
const client = require("redis").createClient();
const limiter = require("express-limiter")(app, client);
const Limiterconfig = require("./config/limiter");
limiter(Limiterconfig);
*/
const cors = require("cors");
app.use(cors());

require("dotenv-safe").config();
require("./database");

const io = require("socket.io")(server);
app.use((req, res, next) => {
  req.io = io;

  next();
});

const Routes = require("./routes");

app.use(Routes);

server.listen(process.env.PORT);
