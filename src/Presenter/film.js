import {render, replace, remove} from "../utils.js";
import {UpdateType, UserAction} from '../const.js';
import FilmPopUpView from "../view/film-popup.js";
import FilmsCardView from "../view/film-card.js";

const CARDSTATE = {
  OPENED: `OPENED`,
  CLOSED: `CLOSED`,
};

const ESCAPE_KEY = `Escape`;

export default class FilmPresenter {
  constructor(container, updateData, openOnlyOneFilmPopup) {
    this._filmContainer = container;
    this._updateData = updateData;
    this._popupState = CARDSTATE.CLOSED;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._openOnlyOneFilmPopup = openOnlyOneFilmPopup;
    this._filmOpenCardClickHandler = this._filmOpenCardClickHandler.bind(this);
    this.destroy = this.destroy.bind(this);
    this._addToWatchListHandler = this._addToWatchListHandler.bind(this);
    this._markAsWatchedHandler = this._markAsWatchedHandler.bind(this);
    this._markAsFavoriteHandler = this._markAsFavoriteHandler.bind(this);
    this._receiveNewFilmData = this._receiveNewFilmData.bind(this);
    this.closeAllFilmDetails = this.closeAllFilmDetails.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmsCardView(film);
    this._filmDetailsComponent = new FilmPopUpView(film, this._receiveNewFilmData);

    this._filmsListContainer = this._filmContainer.parentElement;

    this._filmCardComponent.setCardOpenClickHandler(this._filmOpenCardClickHandler);
    this._filmCardComponent.setAddToWatchListClickHandler(this._addToWatchListHandler);
    this._filmCardComponent.setMarkAsWatchedClickHandler(this._markAsWatchedHandler);
    this._filmCardComponent.setMarkAsFavoriteClickHandler(this._markAsFavoriteHandler);

    if (prevFilmDetailsComponent === null && prevFilmCardComponent === null) {
      render(this._filmContainer, this._filmCardComponent);
      return;
    }
    if (this._popupState === CARDSTATE.CLOSED) {
      replace(prevFilmCardComponent, this._filmCardComponent);
    }

    if (this._popupState === CARDSTATE.OPENED) {
      replace(prevFilmDetailsComponent, this._filmDetailsComponent);
    }

    remove(prevFilmDetailsComponent);
    remove(prevFilmCardComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
  }

  closeAllFilmDetails() {
    if (this._popupState === CARDSTATE.OPENED) {
      this._closeFilmDetails();
    }
  }

  _addToWatchListHandler() {
    this._updateData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign({}, this._film, {isInWatchList: !this._film.isInWatchList})
    );
  }

  _markAsWatchedHandler() {
    this._updateData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign({}, this._film, {isViewed: !this._film.isViewed})
    );
  }

  _markAsFavoriteHandler() {
    this._updateData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign({}, this._film, {isFavorited: !this._film.isFavorited})
    );
  }

  _filmOpenCardClickHandler() {
    this._renderFilmDetails(this._film);
  }

  _receiveNewFilmData(newFilmData) {
    this._newFilmData = newFilmData;
  }

  _closeFilmDetails() {
    this._popupState = CARDSTATE.CLOSED;
    remove(this._filmDetailsComponent);
    if (this._newFilmData) {
      this._updateData(
          Object.assign({}, this._newFilmData)
      );
      this._newFilmData = null;
    }
  }

  _renderFilmDetails() {
    this._openOnlyOneFilmPopup();
    this._popupState = CARDSTATE.OPENED;
    this._filmDetailsComponent.getElement()
        .querySelector(`.film-details__comment-input`)
        .addEventListener(`keydown`, (evt) => {
          evt.stopPropagation();
        });


    const onEscKeyDown = (evt) => {
      if (evt.key === ESCAPE_KEY) {
        this._closeFilmDetails();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    document.addEventListener(`keydown`, onEscKeyDown);

    this._filmDetailsComponent.setCloseFilmDetailsClickHandler(() => {
      this._closeFilmDetails();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(this._filmsListContainer, this._filmDetailsComponent);
  }

}
