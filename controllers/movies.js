const Movie = require("../models/movie");
const NotFoundError = require("../errors/not-found-error");
const BadRequestError = require("../errors/request-error");
const { FORBIDDEN, CREATED } = require("../errors/error-codes");

const getMovies = (req, res, next) => {
  Movie.find({ owner: res.user._id })
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: res.user._id,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.status(CREATED).send(movie);
    })
    .catch((err) => {
      if (err.name === ("ValidationError" || "CastError")) {
        next(new BadRequestError(`Data validation error. (${err.message})`));
        return;
      }
      next(err);
    });
};

const deleteMovieById = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail(() => new NotFoundError("Movie not found"))
    .then((movie) => {
      if (movie.owner.valueOf() !== res.user._id) {
        next(res.status(FORBIDDEN).send({ message: "Unauthorized action" }));
        return;
      }

      Movie.deleteOne(movie).then(() => res.send(movie));
    })
    .catch(next);
};

module.exports = { getMovies, createMovie, deleteMovieById };
