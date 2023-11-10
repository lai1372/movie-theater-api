const express = require("express");
const usersRouter = express.Router();
const { check, validationResult } = require("express-validator");
const { User, Show } = require("../models/index");

// CRUD OPERATIONS
usersRouter.use(express.json());
usersRouter.use(express.urlencoded({ extended: true }));

//GET USERS

try {
  usersRouter.get("/", async (req, res) => {
    const allUsers = await User.findAll();
    res.json(allUsers);
  });
} catch (error) {
  next(error);
}

//GET BY ID

try {
  usersRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const userById = await User.findByPk(id);
    res.json(userById);
  });
} catch (error) {
  next(error);
}

//GET USER WITH SHOWS

try {
  usersRouter.get("/:id/shows", async (req, res) => {
    const id = req.params.id;
    const userWithShows = await User.findOne({
      where: { id: id },
      include: Show,
    });
    res.json(userWithShows);
  });
} catch (error) {
  next(error);
}

//PUT SHOW

try {
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
} catch (error) {
  next(error);
}

usersRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = usersRouter;
