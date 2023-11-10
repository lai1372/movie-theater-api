const express = require("express");
const usersRouter = express.Router();
const { check, validationResult } = require("express-validator");
const { User, Show } = require("../models/index");

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

// where id = x include shows?

usersRouter.get("/:id/shows", async (req, res) => {
  const id = req.params.id;
  const userWithShows = await User.findOne({
    where: { id: id },
    include: Show,
  });
  res.json(userWithShows);
});

module.exports = usersRouter;
