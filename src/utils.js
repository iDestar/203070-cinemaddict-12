import Abstract from "./view/abstract.js";

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


export const renderTemplate = (container, template, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  container.insertAdjacentHTML(place, template);
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, child, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};


export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};


export const showPopup = (child) => {
  if (child instanceof Abstract) {
    child = child.getElement();
  }
  document.body.appendChild(child);
  document.body.classList.add(`hide-overflow`);
};

export const closePopup = (child) => {
  if (child instanceof Abstract) {
    child = child.getElement();
  }
  document.body.removeChild(child);
  document.body.classList.remove(`hide-overflow`);
};

const getWeightForNullValue = (valueA, valueB) => {
  if (valueA === null && valueB === null) {
    return 0;
  }

  if (valueA === null) {
    return 1;
  }

  if (valueB === null) {
    return -1;
  }
  return null;
};

export const sortFilmDate = (filmA, filmB) => {
  const weight = getWeightForNullValue(filmA.releaseDate, filmB.releaseDate);

  if (weight !== null) {
    return weight;
  }

  return filmB.releaseDate - filmA.releaseDate;
};

export const sortFilmRating = (filmA, filmB) => {
  const weight = getWeightForNullValue(filmA.rating, filmB.rating);

  if (weight !== null) {
    return weight;
  }

  return filmB.rating - filmA.rating;
};
