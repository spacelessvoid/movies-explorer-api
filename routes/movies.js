const router = require("express").Router();
const { Joi, celebrate } = require("celebrate");
const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require("../controllers/movies");
// TODO const { cyrillicRegExp, latinRegExp } = require("../utils/constants");

router.get("/", getMovies);

router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string()
        .required()
        .uri({ scheme: [/https?/] }),
      trailerLink: Joi.string()
        .required()
        .uri({ scheme: [/https?/] }),
      thumbnail: Joi.string()
        .required()
        .uri({ scheme: [/https?/] }),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      // nameRU: Joi.string().required().pattern(cyrillicRegExp),
      // nameEN: Joi.string().required().pattern(latinRegExp),
    }),
  }),
  createMovie,
);

router.delete(
  "/:movieId",
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteMovieById,
);

module.exports = router;
