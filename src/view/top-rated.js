import AbstractView from "./abstract.js";

const createTopRatedTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container films-list--top-rated""></div>
      </div>
    </section>`
  );
};


export default class MostRated extends AbstractView {
  _getTemplate() {
    return createTopRatedTemplate();
  }
}
