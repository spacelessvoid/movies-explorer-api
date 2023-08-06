const router = require("express").Router();
const { Joi, celebrate } = require("celebrate");

const { getUserInfo, updateUserInfo } = require("../controllers/users");

router.get(
  "/me",
  celebrate({
    body: Joi.object().keys({
      _id: Joi.string().alphanum().length(24).required(),
    }),
  }),
  getUserInfo,
);

router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().email(),
    }),
  }),
  updateUserInfo,
);

module.exports = router;
