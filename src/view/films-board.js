import AbstractView from "./abstract.js";

export default class FilmsBoard extends AbstractView {
  _getTemplate() {
    return `<section class="films"></section>`;
  }
}
