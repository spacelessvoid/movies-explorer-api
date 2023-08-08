const router = require("express").Router();
const { auth } = require("../middlewares/auth");
const { signup, signin } = require("../controllers/users");
const usersRouter = require("./users");
const moviesRouter = require("./movies");
const NotFoundError = require("../errors/not-found-error");
const { validateSignup, validateSignin } = require("../middlewares/validation");

router.post("/signup", validateSignup(), signup);

router.post("/signin", validateSignin(), signin);

router.use("/users", auth, usersRouter);

router.use("/movies", auth, moviesRouter);

router.all("*", (req, res, next) => {
  next(new NotFoundError("Requested resource was not found"));
});

module.exports = router;
