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

usersRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const userById = await User.findByPk(id);
  res.json(userById);
});

module.exports = usersRouter;
