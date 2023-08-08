const mongoose = require("mongoose");
const { urlRegExp } = require("../utils/constants");

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    director: {
      type: String,
      required: [true, "Director is required"],
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
    },
    year: {
      type: String,
      required: [true, "Year is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
      validate: {
        validator: (v) => {
          const re = urlRegExp;
          return re.test(v);
        },
        message: "Incorrect URL",
      },
    },
    trailerLink: {
      type: String,
      required: [true, "Trailer link is required"],
      validate: {
        validator: (v) => {
          const re = urlRegExp;
          return re.test(v);
        },
        message: "Incorrect URL",
      },
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required"],
      validate: {
        validator: (v) => {
          const re = urlRegExp;
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
      required: [true, "movieId is required"],
    },
    nameRU: {
      type: String,
      required: [true, "Name in Russian is required"],
    },
    nameEN: {
      type: String,
      required: [true, "Name in English is required"],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model("movie", movieSchema);
