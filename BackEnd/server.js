/* Configuration */
const express       = require("express");
const bodyparser    = require("body-parser");
const config        = require("./configuration.json");
const app           = express();

/* router */
const indexRouter   = require("./Router/index.js");

/* middle-ware setting */
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use("/", indexRouter);

app.listen(config.port);