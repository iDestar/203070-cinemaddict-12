import AbstractView from "./abstract.js";

const MAX_NUMBER_CHARACTERS = 139;

const truncatesText = (text, limit) => {
  const textNumbers = text.length;
  if (textNumbers <= limit) {
    return text;
  }
  const briefDescription = text.slice(0, limit) + `...`;

  return briefDescription;
};

const createFilmCardTemplate = (card) => {
  const {original, poster, description, rating, year, genre, comments} = card;
  const newDescription = truncatesText(description, MAX_NUMBER_CHARACTERS);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${original}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">1h 55m</span>
        <span class="film-card__genre">${genre.join(`, `)}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${newDescription}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};


export default class FilmCard extends AbstractView {
  constructor(film) {
    super();

    this._film = film;

    this._isAddToWatchListt = film.isAddToWatchList;
    this._isAlreadyWatched = film.isAlreadyWatched;
    this._isAddToFavorites = film.isAddToFavorites;
    this._film = film;
    this._posterClickHandler = this._posterClickHandler.bind(this);
    this._titleClickHandler = this._titleClickHandler.bind(this);
    this._commentsClickHandler = this._commentsClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _posterClickHandler(evt) {
    evt.preventDefault();
    this._callback.posterClick();
  }

  setPosterClickHandler(callback) {
    this._callback.posterClick = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._posterClickHandler);
  }

  _titleClickHandler(evt) {
    evt.preventDefault();
    this._callback.titleClick();
  }

  setTitleClickHandler(callback) {
    this._callback.titleClick = callback;
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._titleClickHandler);
  }

  _commentsClickHandler(evt) {
    evt.preventDefault();
    this._callback.commentsClick();
  }

  setCommentsClickHandler(callback) {
    this._callback.commentsClick = callback;
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._commentsClickHandler);
  }
}
