const User = require("../models/user");
const BadRequestError = require("../errors/request-error");
const NotFoundError = require("../errors/not-found-error");
const AuthError = require("../errors/authorization-error");

const getUserInfo = (req, res, next) => {
  User.findOne({ _id: res.user._id })
    .then((user) => {
      if (!user) {
        next(new NotFoundError("There is no user with this id"));
        return;
      }

      res.send(user);
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    res.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === ("ValidationError" || "CastError")) {
        next(new BadRequestError(`Data validation error. (${err.message})`));
        return;
      }
      next(err);
    });
};

const signup = (req, res, next) => {};

const signin = (req, res, next) => {};

module.exports = {
  getUserInfo,
  updateUserInfo,
  signup,
  signin,
};
