const express = require("express");
const usersRouter = express.Router();
const { check, validationResult } = require("express-validator");
const { User } = require("../models/index");

// CRUD OPERATIONS
usersRouter.use(express.json());
usersRouter.use(express.urlencoded({ extended: true }));

usersRouter.get("/", async (req, res) => {
  const allUsers = await User.findAll();
  res.json(allUsers);
});

module.exports = usersRouter;
