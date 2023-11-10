const express = require("express");
const showsRouter = express.Router();
const { check, validationResult } = require("express-validator");
const { Show } = require("../models/index");

// CRUD OPERATIONS
showsRouter.use(express.json());
showsRouter.use(express.urlencoded({ extended: true }));

showsRouter.get("/", async (req, res) => {
  const allShows = await Show.findAll();
  res.json(allShows);
});

module.exports = showsRouter;
