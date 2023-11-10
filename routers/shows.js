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

showsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const showById = await Show.findByPk(id);
  res.json(showById);
});

showsRouter.get("/genres/:genre", async (req, res) => {
  const genre = req.params.genre;
  const showsByGenre = await Show.findAll({ where: { genre: genre } });
  res.json(showsByGenre);
});

showsRouter.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const reqBody = req.body;
  const show = await Show.findByPk(id);
  const updateRating = await show.update({ rating: reqBody.rating });
  res.json(show);
});

showsRouter.patch("/:id/updates", async (req, res) => {
  const id = req.params.id;
  const reqBody = req.body;
  const show = await Show.findByPk(id);
  const updateRating = await show.update({ status: reqBody.status });
  res.json(show);
});

showsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const show = await Show.findByPk(id);
  const name = show.title;
  const deleted = await show.destroy();
  res.send(`${name} deleted`);
});

module.exports = showsRouter;
