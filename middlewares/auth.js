const jwt = require("jsonwebtoken");
const AuthError = require("../errors/authorization-error");
const { SERVER_SECRET } = require("../utils/configs");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new AuthError("Please sign in"));
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(
      token,
      SERVER_SECRET,
    );
  } catch (err) {
    next(new AuthError("Invalid token. Please sign in"));
  }

  res.user = payload;

  next();
};

module.exports = { auth };
