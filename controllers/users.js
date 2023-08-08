const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const BadRequestError = require("../errors/request-error");
const NotFoundError = require("../errors/not-found-error");
const AuthError = require("../errors/authorization-error");
const ConflictError = require("../errors/conflict");
const { CREATED } = require("../errors/error-codes");
const { SERVER_SECRET } = require("../utils/configs");

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
          next(new BadRequestError(`Data validation error (${error.message})`));
          return;
        }
        if (error.code === 11000) {
          next(new ConflictError(`User with this email already exists (${error.message})`));
          return;
        }
        next(error);
      });
  });
};

const signin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new BadRequestError("Please provide email and password"));
    return;
  }

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        next(new AuthError("User doesn't exist"));
        return;
      }

      bcrypt.compare(password, user.password, (err, isValidPassword) => {
        if (!isValidPassword) {
          next(new AuthError("Invalid password"));
          return;
        }

        const token = jwt.sign(
          { _id: user._id },
          SERVER_SECRET,
          { expiresIn: "7d" },
        );

        res.send({ token });
      });
    })
    .catch(next);
};

module.exports = {
  getUserInfo,
  updateUserInfo,
  signup,
  signin,
};
