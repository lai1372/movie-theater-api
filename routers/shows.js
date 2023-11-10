const express = require("express");
const showsRouter = express.Router();
const { check, validationResult } = require("express-validator");
const { Show } = require("../models/index");

showsRouter.use(express.json());
showsRouter.use(express.urlencoded({ extended: true }));

// GET ALL
try {
  showsRouter.get("/", async (req, res, next) => {
    const allShows = await Show.findAll();
    res.json(allShows);
  });
} catch (error) {
  next(error);
}

//GET BY ID

try {
  showsRouter.get("/:id", async (req, res, next) => {
    const id = req.params.id;
    const showById = await Show.findByPk(id);
    res.json(showById);
  });
} catch (error) {
  next(error);
}

//GET GENRES

try {
  showsRouter.get("/genres/:genre", async (req, res) => {
    const genre = req.params.genre;
    const showsByGenre = await Show.findAll({ where: { genre: genre } });
    res.json(showsByGenre);
  });
} catch (error) {
  next(error);
}

//PATCH RATING

try {
  showsRouter.patch(
    "/:id",
    [check("rating").not().isEmpty()],
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.json({ error: errors.array() });
      } else {
        const id = req.params.id;
        const reqBody = req.body;
        const show = await Show.findByPk(id);
        if (show.rating === null) {
          show.update({ rating: reqBody.rating });
        } else {
          const newRating = show.rating + reqBody.rating / 2;
          await show.update({ rating: newRating });
        }
        res.json(show);
      }
    }
  );
} catch (error) {
  next(error);
}

//PATCH UPDATE STATUS

try {
  showsRouter.patch(
    "/:id/updates",
    [
      check("status").not().isEmpty().trim(),
      check("status").isLength({ min: 5, max: 25 }),
    ],
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.json({ error: errors.array() });
      } else {
        const id = req.params.id;
        const reqBody = req.body;
        const show = await Show.findByPk(id);
        await show.update({ status: reqBody.status });
        res.json(show);
      }
    }
  );
} catch (error) {
  next(error);
}

//DELETE SHOW

try {
  showsRouter.delete("/:id", async (req, res, next) => {
    const id = req.params.id;
    const show = await Show.findByPk(id);
    const name = show.title;
    await show.destroy();
    res.send(`${name} deleted`);
  });
} catch (error) {
  next(error);
}

module.exports = showsRouter;
