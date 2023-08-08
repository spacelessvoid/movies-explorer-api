require("dotenv").config();

const {
  NODE_ENV, JWT_SECRET, DB_ADDRESS, PORT,
} = process.env;

const DEV_SECRET = "DEV-SECRET";
const DEV_DB_ADDRESS = "mongodb://127.0.0.1:27017/filmexpdb";
const DEV_PORT = 3000;

const SERVER_DB = NODE_ENV === "production" && DB_ADDRESS ? DB_ADDRESS : DEV_DB_ADDRESS;
const SERVER_PORT = NODE_ENV === "production" && PORT ? PORT : DEV_PORT;
const SERVER_SECRET = NODE_ENV === "production" && JWT_SECRET ? JWT_SECRET : DEV_SECRET;

const rateLimiterConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
};

const mongooseConfig = {
  useNewUrlParser: true,
};

module.exports = {
  SERVER_DB,
  SERVER_PORT,
  SERVER_SECRET,
  rateLimiterConfig,
  mongooseConfig,
};
