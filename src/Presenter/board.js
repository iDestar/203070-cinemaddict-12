import FilmsBoardView from "../view/films-board.js";
import FilmsListView from "../view/film-list.js";
import SortView from "../view/sort.js";
import NoFilmView from "../view/no-film.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import MostRatedView from "../view/top-rated.js";
import MostCommentedView from "../view/most-commented.js";
import FilmPresenter from './film.js';
import {render, remove, sortFilmDate, sortFilmRating, updateItem} from "../utils.js";
import {SortType} from "../const.js";

const FILMS_COUNT_PER_STEP = 5;
const FILMS_RATED_COUNT = 2;
const FILMS_COMMENTED_COUNT = 2;

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._currentSortType = SortType.DEFAULT;
    this._sortComponent = new SortView();
    this._boardComponent = new FilmsBoardView();
    this._listComponent = new FilmsListView();
    this._topRatedComponent = new MostRatedView();
    this._mostCommentedComponent = new MostCommentedView();
    this._noDataComponent = new NoFilmView();
    this._filmPresenter = {};
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._updateData = this._updateData.bind(this);

    this._clickSortingHandler = this._clickSortingHandler.bind(this);
    this._openOnlyOneFilmPopup = this._openOnlyOneFilmPopup.bind(this);
  }

  init(boardFilms) {
    this._boardFilms = boardFilms;
    this._sourceBoardFilms = boardFilms.slice();
    this._renderSorting();
    render(this._boardContainer, this._boardComponent);

    this._renderFilms();
  }

  _updateData(updatedFilm, doNotRerender) {
    this._boardFilms = updateItem(this._boardFilms, updatedFilm);
    this._sourceBoardFilms = updateItem(this._sourceBoardFilms, updatedFilm);
    if (!doNotRerender) {
      this._filmPresenter[updatedFilm.id].init(updatedFilm);
    }
  }

  _openOnlyOneFilmPopup() {
    Object.values(this._filmPresenter).forEach((presenter) => {
      presenter.closeAllFilmDetails();
    });
  }

  _clearAllFilmsContainer() {
    Object.values(this._filmPresenter).forEach((presenter) => {
      presenter.destroy();
    });

    this._filmPresenter = {};
  }


  _sortFilms(sortType) {
    this._currentSortType = sortType;
    this._clearAllFilmsContainer();

    switch (sortType) {
      case SortType.DATE:
        this._boardFilms.sort(sortFilmDate);
        break;
      case SortType.RATING:
        this._boardFilms.sort(sortFilmRating);
        break;
      default:
        this._boardFilms = this._sourceBoardFilms.slice();
    }

    this._renderAllFilmsOnStart();
  }

  _renderSorting() {
    this._sortComponent.setClickHandler(this._clickSortingHandler);
    render(this._boardContainer, this._sortComponent);
  }

  _clickSortingHandler(sortType) {
    if (sortType === this._currentSortType) {
      return;
    }

    this._sortFilms(sortType);
  }

  _renderNoFilm() {
    render(this._boardComponent, this._noDataComponent);
  }

  _renderFilm(container, film) {
    const filmPresenter = new FilmPresenter(container, this._updateData, this._openOnlyOneFilmPopup);
    filmPresenter.init(film);

    this._filmPresenter[film.id] = filmPresenter;
  }

  _showMoreButtonHandler() {
    if (this._filmsShowing < this._boardFilms.length) {
      this._boardFilms.slice(this._filmsShowing, this._filmsShowing + FILMS_COUNT_PER_STEP).forEach((it) => {
        this._renderFilm(this._allFilmsContainerElement, it);
      });
      this._filmsShowing += FILMS_COUNT_PER_STEP;
    }
    if (this._filmsShowing >= this._boardFilms.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._listComponent, this._showMoreButtonComponent);
    this._filmsShowing = FILMS_COUNT_PER_STEP;
    this._showMoreButtonComponent.setClickHandler(() => {
      this._showMoreButtonHandler();
    });
  }

  _renderAllFilmsOnStart() {
    const filmsCountToFirstRender = Math.min(this._boardFilms.length, FILMS_COUNT_PER_STEP);
    this._boardFilms.slice(0, filmsCountToFirstRender).forEach((film) => {
      this._renderFilm(this._allFilmsContainerElement, film);
    });

    if (this._boardFilms.length > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderFilms() {
    if (this._boardFilms.length === 0) {
      this._renderNoFilm();
      return;
    }

    render(this._boardComponent, this._listComponent);
    this._allFilmsContainerElement = this._boardComponent.getElement().querySelector(`.films-list__container`);
    this._renderAllFilmsOnStart();

  }

  _renderTopCommentedFilms() {
    render(this._boardComponent, this._mostCommentedComponent);
    const topCommentedFilmsContainerElement = this._mostCommentedComponent.getElement().querySelector(`.films-list__container`);
    const filterTopCommented = this._boardFilms.slice().sort((a, b) => b.comments.length - a.comments.length);
    filterTopCommented.slice(0, FILMS_COMMENTED_COUNT).forEach((it) => {
      this._renderFilm(topCommentedFilmsContainerElement, it);
    });
  }

  _renderTopRatedFilms() {
    render(this._boardComponent, this._mostCommentedComponent);
    const topRatedFilmsContainerElement = this._topRatedComponent.getElement().querySelector(`.films-list__container`);
    const filterTopRated = this._boardFilms.slice().sort((a, b) => b.rating - a.rating);
    filterTopRated.slice(0, FILMS_RATED_COUNT).forEach((it) => {
      this._renderFilm(topRatedFilmsContainerElement, it);
    });
  }


}
