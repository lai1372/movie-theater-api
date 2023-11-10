const express = require("express");
const showsRouter = express.Router();
const { check, validationResult } = require("express-validator");
const { Show } = require("../models/index");

showsRouter.use(express.json());
showsRouter.use(express.urlencoded({ extended: true }));

// GET ALL
showsRouter.get("/", async (req, res) => {
  const allShows = await Show.findAll();
  res.json(allShows);
});

//GET BY ID
showsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const showById = await Show.findByPk(id);
  res.json(showById);
});

//GET GENRES
showsRouter.get("/genres/:genre", async (req, res) => {
  const genre = req.params.genre;
  const showsByGenre = await Show.findAll({ where: { genre: genre } });
  res.json(showsByGenre);
});

//PATCH RATING
showsRouter.patch(
  "/:id",
  [check("rating").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      const id = req.params.id;
      const reqBody = req.body;
      const show = await Show.findByPk(id);
      if (show.rating === null) {
        show.update({ rating: reqBody.rating })
      } else {
        const newRating = show.rating + reqBody.rating / 2;
        await show.update({ rating: newRating });
      }
      res.json(show);
    }
  }
);

//PATCH UPDATE STATUS
showsRouter.patch(
  "/:id/updates",
  [
    check("status").not().isEmpty().trim(),
    check("status").isLength({ min: 5, max: 25 }),
  ],
  async (req, res) => {
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

//DELETE SHOW
showsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const show = await Show.findByPk(id);
  const name = show.title;
  await show.destroy();
  res.send(`${name} deleted`);
});

module.exports = showsRouter;
