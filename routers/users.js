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

//GET BY ID
usersRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const userById = await User.findByPk(id);
  res.json(userById);
});

//GET USER WITH SHOWS
usersRouter.get("/:id/shows", async (req, res) => {
  const id = req.params.id;
  const userWithShows = await User.findOne({
    where: { id: id },
    include: Show,
  });
  res.json(userWithShows);
});

//PUT SHOW
usersRouter.put("/:userid/shows/:showid", async (req, res) => {
  const userId = req.params.userid;
  const showId = req.params.showid;

  const userWithShow = await User.findOne({
    where: { id: userId },
    include: Show,
  });

  const show = await Show.findByPk(showId);

  await userWithShow.addShow(show);

  res.json(userWithShow);
});

module.exports = usersRouter;
