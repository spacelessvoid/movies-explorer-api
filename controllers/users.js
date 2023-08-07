const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const BadRequestError = require("../errors/request-error");
const NotFoundError = require("../errors/not-found-error");
const AuthError = require("../errors/authorization-error");
const { CREATED, CONFLICT } = require("../errors/error-codes");

const SALT_ROUNDS = 10;

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

const signup = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
    User.create({ name, email, password: hash })
      .then((user) => {
        const { name, email } = user;
        res.status(CREATED).send({ name, email });
      })
      .catch((error) => {
        if (error.name === ("ValidationError" || "CastError")) {
          next(
            new BadRequestError(`Data validation error (${error.message})`),
          );
          return;
        }
        if (error.code === 11000) {
          next(
            res.status(CONFLICT).send({
              message: `User with this email already exists (${error.message})`,
            }),
          );
          return;
        }
        next(error);
      });
  });
};

const signin = (req, res, next) => {};

module.exports = {
  getUserInfo,
  updateUserInfo,
  signup,
  signin,
};
