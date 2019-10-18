const express = require("express");
const Routes = require("./routes");

require("./database");

const app = express();

app.use(express.json());
app.use(Routes);

app.listen(3333);
