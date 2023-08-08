const urlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const allowedCors = {
  origin: [
    "https://spacemovies.nomoreparties.co",
    "https://spacemovies.nomoreparties.co",
    "http://localhost:3001",
    "http://localhost:3000",
  ],
};

module.exports = { urlRegExp, allowedCors };
