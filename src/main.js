
const CARDS_IN_BLOCK_COUNT = 2;
const CARDS_COUNT = 5;
const MOCKCOUNT = 20;
import Profile from "./view/profile.js";
import Navigation from "./view/navigation.js";
import Sort from "./view/sort.js";
import FilmList from "./view/film-list.js";
import ShowMoreButtonElement from "./view/show-more-button.js";
import FilmCard from "./view/film-card.js";
import MostRated from "./view/top-rated.js";
import MostCommented from "./view/most-commented.js";
import MovieAmount from "./view/movie-amount.js";
import FilmPopUp from "./view/film-popup.js";
import {getFilmCard} from "./mock/card.js";
import {renderElement, RenderPosition} from "./utils.js";
import {generateNavigationFilter} from "./mock/filter.js";


const getFilmCardCount = (count) => {
  return new Array(count).fill(``).map(getFilmCard);
};

const renderFilm = (container, film) => {
  const filmComponent = new FilmCard(film);
  const filmPopupComponent = new FilmPopUp(film);

  const addFilmPopup = () => {
    siteFooterElement.appendChild(filmPopupComponent.getElement());
  };

  const removeFilmPopup = () => {
    siteFooterElement.removeChild(filmPopupComponent.getElement());
  };

  filmComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
    addFilmPopup();
  });

  filmComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, () => {
    addFilmPopup();
  });

  filmComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, () => {
    addFilmPopup();
  });

  filmPopupComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
    removeFilmPopup();
  });

  renderElement(container, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

const filmsCardArray = getFilmCardCount(MOCKCOUNT);

const mainFilter = generateNavigationFilter(filmsCardArray);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

renderElement(siteHeaderElement, new Profile().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new Navigation(mainFilter).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new Sort().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new FilmList().getElement(), RenderPosition.BEFOREEND);

const siteFilmListElement = document.querySelector(`.films-list`);
const siteFilmConteinerElement = siteFilmListElement.querySelector(`.films-list__container`);

for (let i = 0; i < CARDS_COUNT; i++) {
  renderFilm(siteFilmConteinerElement, filmsCardArray[i]);
}

const showMoreButton = new ShowMoreButtonElement();

if (filmsCardArray.length > CARDS_COUNT) {
  let renderedCardsCount = CARDS_COUNT;
  renderElement(siteFilmListElement, showMoreButton.getElement(), RenderPosition.BEFOREEND);

  showMoreButton.getElement().addEventListener(`click`, function (evt) {
    evt.preventDefault();
    filmsCardArray.slice(renderedCardsCount, renderedCardsCount + CARDS_COUNT).forEach((film) => renderFilm(siteFilmConteinerElement, film));
    renderedCardsCount += CARDS_COUNT;
    if (renderedCardsCount >= filmsCardArray.length) {
      showMoreButton.getElement().remove();
      showMoreButton.removeElement();
    }
  }
  );
}


const siteFilmsElement = document.querySelector(`.films`);

renderElement(siteFilmsElement, new MostRated().getElement(), RenderPosition.BEFOREEND);
renderElement(siteFilmsElement, new MostCommented().getElement(), RenderPosition.BEFOREEND);

const filmListExtra = siteMainElement.querySelectorAll(`.films-list--extra`);
const filmListTopContainer = filmListExtra[0].querySelector(`.films-list__container`);
const filmListCommendContainer = filmListExtra[1].querySelector(`.films-list__container`);


for (let i = 0; i < CARDS_IN_BLOCK_COUNT; i++) {
  renderElement(filmListCommendContainer, new FilmCard(filmsCardArray[i]).getElement(), `beforeend`);
  renderElement(filmListTopContainer, new FilmCard(filmsCardArray[i]).getElement(), `beforeend`);
}

const siteFooterElement = document.querySelector(`.footer`);
renderElement(siteFooterElement, new MovieAmount().getElement(), RenderPosition.BEFOREEND);
