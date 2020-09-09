import AbstractView from "./abstract.js";
import {SortType} from "../const.js";

const sortButtonActiveClass = `sort__button--active`;

export const createFilterTemplate = (currentSortType) => {
  const setButtonActiveClass = (sortType) => sortType === currentSortType ? sortButtonActiveClass : ``;
  return `<ul class="sort">
            <li><a href="#" class="sort__button ${setButtonActiveClass(SortType.DEFAULT)}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
            <li><a href="#" class="sort__button ${setButtonActiveClass(SortType.DATE)}" data-sort-type="${SortType.DATE}">Sort by date</a></li>
            <li><a href="#" class="sort__button ${setButtonActiveClass(SortType.RATING)}" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
          </ul>`;
};


export default class Sort extends AbstractView {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;
    this._clickHandler = this._clickHandler.bind(this);
  }

  _getTemplate() {
    return createFilterTemplate(this._currentSortType);
  }

  _clickHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.click(evt.target.dataset.sortType);
    this._addActiveClass(evt.target);
  }

  _addActiveClass(target) {
    const sortLinks = this.getElement().querySelectorAll(`.sort__button`);
    sortLinks.forEach((it) => it.classList.remove(sortButtonActiveClass));
    target.classList.add(sortButtonActiveClass);
  }

  setClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}
