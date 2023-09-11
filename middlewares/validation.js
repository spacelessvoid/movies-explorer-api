const { Joi, celebrate } = require("celebrate");

const validateCreateMovie = () => celebrate({
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
    movieId: Joi.number().required(),
  }),
});

const validateDeleteMovie = () => celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

const validateGetUserInfo = () => celebrate({
  body: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).required(),
  }),
});

const validateUpdateUserInfo = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});

const validateSignup = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateSignin = () => celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports = {
  validateCreateMovie,
  validateDeleteMovie,
  validateGetUserInfo,
  validateUpdateUserInfo,
  validateSignup,
  validateSignin,
};
