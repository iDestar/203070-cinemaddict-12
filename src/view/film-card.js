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

const addActiveClass = (item) => {
  return item ? `film-card__controls-item--active` : ``;
};

const createFilmCardTemplate = (card) => {
  const {original, poster, description, rating, year, genres, comments, isViewed, isInWatchList, isFavorited} = card;
  const newDescription = truncatesText(description, MAX_NUMBER_CHARACTERS);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${original}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">1h 55m</span>
        <span class="film-card__genre">${genres.join(`, `)}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${newDescription}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${addActiveClass(isInWatchList)}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${addActiveClass(isViewed)}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${addActiveClass(isFavorited)}">Mark as favorite</button>
      </form>
    </article>`
  );
};


export default class FilmCard extends AbstractView {
  constructor(film) {
    super();

    this._film = film;
    this._cardOpenClickHandler = this._cardOpenClickHandler.bind(this);
    this._addToWatchListClickHandler = this._addToWatchListClickHandler.bind(this);
    this._markAsWatchedClickHandler = this._markAsWatchedClickHandler.bind(this);
    this._markAsFavoriteClickHandler = this._markAsFavoriteClickHandler.bind(this);
  }

  _cardOpenClickHandler(evt) {
    evt.preventDefault();
    this._callback.cardOpenClick();
  }

  _getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _addToWatchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickAddToWatchList();
  }

  setAddToWatchListClickHandler(callback) {
    this._callback.clickAddToWatchList = callback;
    const addToWatchListElement = this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`);
    addToWatchListElement.addEventListener(`click`, this._addToWatchListClickHandler);
  }

  _markAsWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickMarkAsWatched();
  }

  setMarkAsWatchedClickHandler(callback) {
    this._callback.clickMarkAsWatched = callback;
    const markAsWatchedElement = this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`);
    markAsWatchedElement.addEventListener(`click`, this._markAsWatchedClickHandler);
  }

  _markAsFavoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickMarkAsFavorite();
  }

  setMarkAsFavoriteClickHandler(callback) {
    this._callback.clickMarkAsFavorite = callback;
    const markAsFavoriteElement = this.getElement().querySelector(`.film-card__controls-item--favorite`);
    markAsFavoriteElement.addEventListener(`click`, this._markAsFavoriteClickHandler);
  }

  setCardOpenClickHandler(callback) {
    this._callback.cardOpenClick = callback;
    const filmCardPoster = this.getElement().querySelector(`.film-card__poster`);
    const filmCardTitle = this.getElement().querySelector(`.film-card__title`);
    const filmCardComments = this.getElement().querySelector(`.film-card__comments`);
    [filmCardPoster, filmCardTitle, filmCardComments].forEach((filmCardItem) => {
      filmCardItem.addEventListener(`click`, this._cardOpenClickHandler);
    });
  }

}
