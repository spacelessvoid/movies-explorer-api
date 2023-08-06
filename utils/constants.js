const urlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const cyrillicRegExp = /^(?=.*[А-Я0-9])[\w.,!"'/$ ]+$/i;

const latinRegExp = /^(?=.*[A-Z0-9])[\w.,!"'/$ ]+$/i;

module.exports = { urlRegExp, cyrillicRegExp, latinRegExp };
