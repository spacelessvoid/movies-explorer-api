const router = require("express").Router();

const { getUserInfo, updateUserInfo } = require("../controllers/users");
const {
  validateGetUserInfo,
  validateUpdateUserInfo,
} = require("../middlewares/validation");

router.get("/me", validateGetUserInfo(), getUserInfo);

router.patch("/me", validateUpdateUserInfo(), updateUserInfo);

module.exports = router;
