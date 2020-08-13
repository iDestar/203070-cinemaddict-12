import {createElement} from "../utils.js";

const createMovieAmountTemplate = () => {
  return (
    `<section class="footer__statistics">
      <p>130 291 movies inside</p>
    </section>`
  );
};

export default class MovieAmount {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMovieAmountTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
