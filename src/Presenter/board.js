import FilmsBoardView from "../view/films-board.js";
import FilmsListView from "../view/film-list.js";
import SortView from "../view/sort.js";
import NoFilmView from "../view/no-film.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import FilmPresenter from './film.js';
import {render, remove} from "../utils.js";
import {FilterType, SortType, UpdateType, UserAction} from "../const.js";
import {filter} from '../filter.js';
import LoadingView from '../view/loading.js';

const FILMS_COUNT_PER_STEP = 5;


export default class Board {
  constructor(boardContainer, filmsModel, filterModel, api) {
    this._boardContainer = boardContainer;
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._filmsShowing = FILMS_COUNT_PER_STEP;
    this._filmsSortingComponent = null;
    this._currentSortType = SortType.DEFAULT;
    this._sortComponent = new SortView();
    this._boardComponent = new FilmsBoardView();
    this._listComponent = new FilmsListView();
    this._noDataComponent = new NoFilmView();
    this._filmPresenter = {};
    this._showMoreButtonComponent = null;
    this._handleViewAction = this._handleViewAction.bind(this);

    this._clickSortingHandler = this._clickSortingHandler.bind(this);
    this._openOnlyOneFilmPopup = this._openOnlyOneFilmPopup.bind(this);
    this._handleModelAction = this._handleModelAction.bind(this);
    this._isLoading = true;
    this._loadingComponent = new LoadingView();
    this._api = api;

  }

  init() {
    this._renderFilmsBoard();
    this.isDestroy = false;

    this._filmsModel.addObserver(this._handleModelAction);
    this._filterModel.addObserver(this._handleModelAction);
  }

  destroy() {
    this._clearFilmsBoard({resetRenderedTaskCount: true, resetSortType: true});
    remove(this._listComponent);
    remove(this._boardComponent);
    remove(this._loadingComponent);
    this.isDestroy = true;

    this._filmsModel.deleteObserver(this._handleModelAction);
    this._filterModel.deleteObserver(this._handleModelAction);
  }

  _getFilms() {
    const films = this._filmsModel.getFilms();
    const filterType = this._filterModel.getFilter();
    const filteredFilms = filter[filterType](films);
    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredFilms.sort((filmA, filmB) => filmB.releaseDate - filmA.releaseDate);
      case SortType.RATING:
        return filteredFilms.sort((filmA, filmB) => filmB.rating - filmA.rating);
    }

    return filteredFilms;
  }

  _clearFilmsBoard({resetRenderedTaskCount = false, resetSortType = false} = {}) {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    remove(this._filmsSortingComponent);
    remove(this._noDataComponent);

    if (this._showMoreButtonComponent) {
      remove(this._showMoreButtonComponent);
    }

    if (resetRenderedTaskCount) {
      this._filmsShowing = FILMS_COUNT_PER_STEP;
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _handleViewAction(userAction, updateType, update, callback) {
    switch (userAction) {
      case UserAction.UPDATE_FILM:
        this._api.updateFilm(update)
        .then((response) => this._filmsModel.updateFilm(updateType, response, callback));
        break;
      case UserAction.UPDATE_BOARD:
        this._clearFilmsBoard();
        this._renderFilmsBoard();
    }
  }

  _handleModelAction(updateType, update, callback) {
    if (updateType === UpdateType.MINOR && this._filterModel.getFilter() === FilterType.ALL) {
      updateType = UpdateType.PATCH;
    }
    switch (updateType) {
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderFilmsBoard();
        break;
      case UpdateType.PATCH:
        if (callback) {
          callback();
          return;
        }
        this._filmPresenter[update.id].init(update);
        break;
      case UpdateType.MINOR:
        this._clearFilmsBoard();
        this._renderFilmsBoard();
        break;
      case UpdateType.MAJOR:
        this._clearFilmsBoard({resetRenderedTaskCount: true, resetSortType: true});
        this._renderFilmsBoard();
        break;
    }
  }


  _openOnlyOneFilmPopup() {
    Object.values(this._filmPresenter).forEach((presenter) => {
      presenter.closeAllFilmDetails();
    });
  }

  _clickSortingHandler(sortType) {
    if (sortType === this._currentSortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearFilmsBoard({resetRenderedTaskCount: true});
    this._renderFilmsBoard();
  }

  _renderSorting() {
    if (this._filmsSortingComponent !== null) {
      remove(this._filmsSortingComponent);
      this._filmsSortingComponent = null;
    }

    this._filmsSortingComponent = new SortView(this._currentSortType);
    this._filmsSortingComponent.setClickHandler(this._clickSortingHandler);
    render(this._boardContainer, this._filmsSortingComponent);
  }

  _renderLoading() {
    render(this._boardComponent, this._loadingComponent);
  }


  _renderNoFilms() {
    render(this._boardComponent, this._noDataComponent);
  }

  _renderFilm(container, film) {
    const filmPresenter = new FilmPresenter(container, this._handleViewAction, this._openOnlyOneFilmPopup, this._api);
    filmPresenter.init(film);

    this._filmPresenter[film.id] = filmPresenter;
  }

  _clickLoadMoreButtonHandler() {
    const films = this._getFilms();
    if (this._filmsShowing < films.length) {
      films.slice(this._filmsShowing, this._filmsShowing + FILMS_COUNT_PER_STEP).forEach((it) => {
        this._renderFilm(this._allFilmsContainerElement, it);
      });
      this._filmsShowing += FILMS_COUNT_PER_STEP;
    }

    if (this._filmsShowing >= films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }
    this._showMoreButtonComponent = new ShowMoreButtonView();
    render(this._listComponent, this._showMoreButtonComponent);
    this._showMoreButtonComponent.setClickHandler(() => {
      this._clickLoadMoreButtonHandler();
    });
  }

  _renderFilmsBoard() {
    this._renderSorting();
    render(this._boardContainer, this._boardComponent);

    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if (this._getFilms().length === 0) {
      this._renderNoFilms();
      return;
    }


    render(this._boardContainer, this._listComponent);
    this._allFilmsContainerElement = this._boardComponent.getElement().querySelector(`.films-list__container`);

    const films = this._getFilms();
    const filmsCountToFirstRender = Math.min(films.length, this._filmsShowing);
    films.slice(0, filmsCountToFirstRender).forEach((film) => {
      this._renderFilm(this._allFilmsContainerElement, film);
    });

    if (films.length > this._filmsShowing) {
      this._renderLoadMoreButton();
    }
  }
}
