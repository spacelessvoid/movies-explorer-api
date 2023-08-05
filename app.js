require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { errors } = require("celebrate");
const cors = require("cors");

const app = express();

const { PORT, DB_ADDRESS } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

mongoose
  .connect(DB_ADDRESS, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log("SERVER IS RUNNING");
});
