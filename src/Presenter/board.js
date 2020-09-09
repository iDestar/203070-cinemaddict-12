import FilmsBoardView from "../view/films-board.js";
import FilmsListView from "../view/film-list.js";
import SortView from "../view/sort.js";
import NoFilmView from "../view/no-film.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import FilmPresenter from './film.js';
import {render, remove} from "../utils.js";
import {FilterType, SortType, UpdateType, UserAction} from "../const.js";
import {filter} from '../filter.js';

const FILMS_COUNT_PER_STEP = 5;


export default class Board {
  constructor(boardContainer, filmsModel, filterModel) {
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

  _handleViewAction(userAction, updateType, update) {
    switch (userAction) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
    }
  }

  _handleModelAction(updateType, update) {
    if (updateType === UpdateType.MINOR && this._filterModel.getFilter() === FilterType.ALL) {
      updateType = UpdateType.PATCH;
    }
    switch (updateType) {
      case UpdateType.PATCH:
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
      this._filmsSortingComponent = null;
    }

    this._filmsSortingComponent = new SortView(this._currentSortType);
    this._filmsSortingComponent.setClickHandler(this._clickSortingHandler);
    render(this._boardContainer, this._filmsSortingComponent);
  }

  _renderNoFilms() {
    render(this._boardComponent, this._noDataComponent);
  }

  _renderFilm(container, film) {
    const filmPresenter = new FilmPresenter(container, this._handleViewAction, this._openOnlyOneFilmPopup);
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
    if (this._getFilms().length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderSorting();
    render(this._boardContainer, this._boardComponent);
    render(this._boardComponent, this._listComponent);
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
