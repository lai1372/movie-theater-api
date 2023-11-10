const express = require("express");
const app = express();
const usersRouter = require("../routers/users");

app.use("/users", usersRouter);

module.exports = app;
