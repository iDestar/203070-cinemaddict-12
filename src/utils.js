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

export const render = (container, element, place = RenderPosition.BEFOREEND) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

  switch (place) {
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
  }
};


export const createElement = (template) => {
  const tempContainer = document.createElement(`div`);
  tempContainer.insertAdjacentHTML(RenderPosition.AFTERBEGIN, template);
  return tempContainer.firstChild;
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};

export const replace = (oldItem, newItem) => {
  if (oldItem instanceof Abstract) {
    oldItem = oldItem.getElement();
  }

  if (newItem instanceof Abstract) {
    newItem = newItem.getElement();
  }

  const parentElement = oldItem.parentElement;

  if (parentElement === null || !oldItem || !newItem) {
    throw new Error(`Can't replace`);
  }

  parentElement.replaceChild(newItem, oldItem);
};


export const updateItem = (itemList, item) => {
  const itemIndex = itemList.findIndex((it) => it.id === item.id);
  if (itemIndex === -1) {
    return itemList;
  }

  return [
    ...itemList.slice(0, itemIndex),
    item,
    ...itemList.slice(itemIndex + 1),
  ];
};
