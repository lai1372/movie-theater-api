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

module.exports = showsRouter;
