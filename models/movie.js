/* eslint-disable no-useless-escape */
/* eslint-disable operator-linebreak */
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const re =
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
        return re.test(v);
      },
      message: "Incorrect URL",
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const re =
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
        return re.test(v);
      },
      message: "Incorrect URL",
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const re =
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
        return re.test(v);
      },
      message: "Incorrect URL",
    },
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const re = /^(?=.*[А-Я0-9])[\w.,!"'\/$ ]+$/i;
        return re.test(v);
      },
      message: "Input is not in Cyrillic characters",
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const re = /^(?=.*[A-Z0-9])[\w.,!"'\/$ ]+$/i;
        return re.test(v);
      },
      message: "Input is not in Latin characters",
    },
  },
});

module.exports = mongoose.model("movie", movieSchema);
