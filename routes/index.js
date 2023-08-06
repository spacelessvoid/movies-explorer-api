const router = require("express").Router();
const { Joi, celebrate } = require("celebrate");
const { signup, signin } = require("../controllers/users");
const usersRouter = require("./users");
const moviesRouter = require("./movies");
const NotFoundError = require("../errors/not-found-error");

router.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  signup,
);

router.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  signin,
);

router.use("/users", usersRouter);

router.use("/movies", moviesRouter);

router.all("*", (req, res, next) => {
  next(new NotFoundError("Requested resource was not found"));
});

module.exports = router;
