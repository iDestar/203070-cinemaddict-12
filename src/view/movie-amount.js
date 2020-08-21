import AbstractView from "./abstract.js";


export default class MovieAmount extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return (
      `<p>${ this._films.length} movies inside</p>`
    );
  }
}
