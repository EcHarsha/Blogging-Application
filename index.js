const express = require("express");
require("./model/config");
const routers = require("./router/mainRouter");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/", routers);

//Start the server
const server = app.listen(8888, () => {
  console.log(`Server running at ${process.env.PORT}`);
});

module.exports = server;
