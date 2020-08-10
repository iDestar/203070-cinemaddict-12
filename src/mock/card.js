import {TITLE} from "../const.js";
import {POSTERS} from "../const.js";
import {DESCRIPTION} from "../const.js";
import {GENRES} from "../const.js";
import {AGES} from "../const.js";
import {COUNTRIES} from "../const.js";
import {NAMES} from "../const.js";
import {EMOJI} from "../const.js";
import {COMMENT_DATE} from "../const.js";
import {getRandomArrayElement} from "../utils.js";
import {getListRandomLength} from "../utils.js";
import {getRandomFloatNumber} from "../utils.js";
import {getRandomNumber} from "../utils.js";

const getRandomGenres = (arr) => {
  const result = [];
  const commentsNumber = (Math.random() * (3 - 0) + 0);
  for (let i = 0; i <= commentsNumber; i++) {
    result.push(getRandomArrayElement(arr));
  }
  return result;
};

const generateComment = () => {
  return {
    emoji: getRandomArrayElement(EMOJI),
    text: getListRandomLength(DESCRIPTION, 1, 5).join(` `),
    author: getRandomArrayElement(NAMES),
    date: getRandomArrayElement(COMMENT_DATE),
  };
};


const generateComments = (count) => {
  return new Array(count).fill(``).map(generateComment);
};

export const getFilmCard = function () {
  const title = getRandomArrayElement(TITLE);
  return {
    name: title,
    original: title,
    poster: getRandomArrayElement(POSTERS),
    description: getListRandomLength(DESCRIPTION, 1, 5).join(` `),
    rating: getRandomFloatNumber(0, 10),
    year: getRandomNumber(1920, 2020),
    genre: getRandomGenres(GENRES),
    comments: generateComments(getRandomNumber(0, 5)),
    ages: getRandomArrayElement(AGES),
    country: getRandomArrayElement(COUNTRIES),
    director: getRandomArrayElement(NAMES),
    writers: getRandomArrayElement(NAMES),
    actors: getRandomArrayElement(NAMES),
    isWatchlist: Boolean(getRandomNumber()),
    isWatched: Boolean(getRandomNumber()),
    isFavorit: Boolean(getRandomNumber()),
  };
};
