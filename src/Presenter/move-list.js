import FilmsBoardView from "../view/films-board.js";
import FilmsListView from "../view/film-list.js";
import FilmsListContainerView from "../view/films-list-container.js";
import NoFilmView from "../view/no-film.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import MostRatedView from "../view/top-rated.js";
import MostCommentedView from "../view/most-commented.js";
import FilmCardView from "../view/film-card.js";
import FilmPopUpView from "../view/film-popup.js";
import {render, RenderPosition, showPopup, closePopup, remove} from "../utils.js";

const FILMS_COUNT_PER_STEP = 5;
const FILMS_RATED_COUNT = 2;
const FILMS_COMMENTED_COUNT = 2;

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderedFilmsCount = FILMS_COUNT_PER_STEP;

    this._boardComponent = new FilmsBoardView();
    this._listComponent = new FilmsListView();
    this._listContainerComponent = new FilmsListContainerView();
    this._topRatedComponent = new MostRatedView();
    this._mostCommentedComponent = new MostCommentedView();
    this._noDataComponent = new NoFilmView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();

    render(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);

    this._renderListContainer();
    this._renderList();
    this._renderBoard();

    this._renderTopRated();
    this._renderMostCommented();
  }

  _renderList() {
    render(this._boardComponent, this._listComponent, RenderPosition.BEFOREEND);
  }

  _renderListContainer() {
    render(this._listComponent, this._listContainerComponent, RenderPosition.BEFOREEND);
  }

  _renderTopRated() {
    render(this._boardComponent, this._topRatedComponent, RenderPosition.BEFOREEND);

    this._boardFilms
      .sort((a, b) => b.raiting - a.raiting)
      .slice(0, FILMS_RATED_COUNT)
      .forEach((film) => {
        const filmsListTopRatedDiv = this._boardContainer.querySelector(`.films-list--top-rated`);
        const filmsListTopRatedComponent = new FilmCardView(film);
        render(filmsListTopRatedDiv, filmsListTopRatedComponent, RenderPosition.BEFOREEND);
      });
  }

  _renderMostCommented() {
    render(this._boardComponent, this._mostCommentedComponent, RenderPosition.BEFOREEND);

    this._boardFilms
      .sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, FILMS_COMMENTED_COUNT)
      .forEach((film) => {
        const filmsListMostCommentedDiv = this._boardContainer.querySelector(`.films-list--most-commented`);
        const filmsListMostCommentedComponent = new FilmCardView(film);
        render(filmsListMostCommentedDiv, filmsListMostCommentedComponent, RenderPosition.BEFOREEND);
      });
  }

  _renderFilm(film) {
    const filmCardComponent = new FilmCardView(film);
    const filmDetailsComponent = new FilmPopUpView(film);

    const showFilmDetails = () => {
      showPopup(filmDetailsComponent);
    };

    const hideFilmDetails = () => {
      closePopup(filmDetailsComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        hideFilmDetails();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };


    filmCardComponent.setPosterClickHandler(() => {
      showFilmDetails();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    filmCardComponent.setTitleClickHandler(() => {
      showFilmDetails();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    filmCardComponent.setCommentsClickHandler(() => {
      showFilmDetails();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    filmDetailsComponent.setCloseClickHandler(() => {
      hideFilmDetails();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(this._listContainerComponent, filmCardComponent, RenderPosition.BEFOREEND);
  }


  _renderFilms(from, to) {
    this._boardFilms
      .slice(from, to)
      .forEach((boardFilm) => this._renderFilm(boardFilm));
  }

  _renderNoFilms() {
    render(this._boardComponent, this._noDataComponent, RenderPosition.AFTERBEGIN);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmsCount, this._renderedFilmsCount + FILMS_COUNT_PER_STEP);
    this._renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this._renderedFilmsCount >= this._boardFilms.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._listComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmList() {
    this._renderFilms(0, Math.min(this._boardFilms.length, FILMS_COUNT_PER_STEP));

    if (this._boardFilms.length > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderBoard() {
    if (this._boardFilms.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderFilmList();
  }
}
