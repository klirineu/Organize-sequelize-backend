const express = require("express");
const Routes = require("./routes");
require("dotenv-safe").config();

require("./database");

const app = express();

app.use(express.json());
app.use(Routes);

app.listen(process.env.PORT);
