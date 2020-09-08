import {TITLE} from "../const.js";
import {POSTERS} from "../const.js";
import {DESCRIPTION} from "../const.js";
import {GENRES} from "../const.js";
import {AGES} from "../const.js";
import {COUNTRIES} from "../const.js";
import {NAMES} from "../const.js";
import {commentEmojis} from "../const.js";
import {COMMENT_DATE} from "../const.js";
import {DateGap} from "../const.js";
import {getRandomArrayElement} from "../utils.js";
import {getListRandomLength} from "../utils.js";
import {getRandomFloatNumber} from "../utils.js";
import {getRandomNumber} from "../utils.js";
import {nanoid} from "nanoid";

const generateDateTime = () => {
  const dateTime = new Date();

  const monthsGap = getRandomNumber(0, DateGap.MONTH);
  dateTime.setMonth(dateTime.getMonth() - monthsGap);

  const daysGap = getRandomNumber(0, DateGap.DAYS);
  dateTime.setDate(dateTime.getDate() - daysGap);

  const hoursGap = getRandomNumber(0, DateGap.HOURS);
  dateTime.setHours(dateTime.getHours() - hoursGap);

  const minutesGap = getRandomNumber(0, DateGap.MINUTES);
  dateTime.setMinutes(dateTime.getMinutes() - minutesGap);

  return dateTime;
};


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
    id: nanoid(),
    emoji: getRandomArrayElement(commentEmojis),
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
  const watchingDate = generateDateTime();
  const isViewed = Boolean(getRandomNumber());
  const isFavorited = Boolean(getRandomNumber());
  const isInWatchList = Boolean(getRandomNumber());
  const genres = getRandomGenres(GENRES);
  return {
    id: nanoid(),
    name: title,
    original: title,
    poster: getRandomArrayElement(POSTERS),
    description: getListRandomLength(DESCRIPTION, 1, 5).join(` `),
    rating: getRandomFloatNumber(0, 10),
    year: getRandomNumber(1920, 2020),
    genres,
    comments: generateComments(getRandomNumber(0, 5)),
    ages: getRandomArrayElement(AGES),
    country: getRandomArrayElement(COUNTRIES),
    director: getRandomArrayElement(NAMES),
    writers: getRandomArrayElement(NAMES),
    actors: getRandomArrayElement(NAMES),
    isViewed,
    isInWatchList,
    isFavorited,
    watchingDate,
  };
};
