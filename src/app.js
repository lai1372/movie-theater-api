const express = require("express");
const app = express();
const usersRouter = require("../routers/users");
const showsRouter = require("../routers/shows");

app.use("/users", usersRouter);

app.use("/shows", showsRouter);

module.exports = app;
