export const getRandomArrayElement = function (arr) {

  return arr[Math.floor(Math.random() * arr.length)];
};

export const getRandomNumber = function (min = 0, max = 1) {

  return Math.floor(min + Math.random() * (max - min + 1));
};

export const getListRandomLength = function (arr, min, max) {
  const listCopy = arr.slice();

  return listCopy.splice(getRandomNumber(0, listCopy.length - 1), getRandomNumber(min, max));
};

export const getRandomFloatNumber = function (min = 0, max = 1, n = 1) {

  return (min + Math.random() * (max - min)).toFixed(n);
};
