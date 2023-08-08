require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { errors } = require("celebrate");
const cors = require("cors");
const { SERVER_DB, SERVER_PORT } = require("./utils/configs");

const app = express();

const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const router = require("./routes/index");
const { rateLimiterConfig, mongooseConfig } = require("./utils/configs");

const limiter = rateLimit(rateLimiterConfig);

mongoose
  .connect(SERVER_DB, mongooseConfig)
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  console.log(
    `SERVER IS RUNNING${
      process.env.NODE_ENV !== "production"
        ? ` ON PORT ${process.env.PORT}`
        : ""
    }`,
  );
});
