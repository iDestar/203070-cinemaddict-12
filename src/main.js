
const CARDS_IN_BLOCK_COUNT = 2;
const CARDS_COUNT = 5;
const MOCKCOUNT = 20;
import {createProfileTemplate} from "./view/profile.js";
import {createNavigationTemplate} from "./view/navigation.js";
import {createFilterTemplate} from "./view/filter.js";
import {createFilmListTemplate} from "./view/film-list.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createShowMoreButton} from "./view/show-more-button.js";
import {createTopRatedTemplate} from "./view/top-rated.js";
import {createMostCommentedTemplate} from "./view/most-commented.js";
// import {createFilmPopupTemplate} from "./view/film-popup.js";
import {createMovieAmountTemplate} from "./view/movie-amount.js";

import {getFilmCard} from "./mock/card.js";
import {generateNavigationFilter} from "./mock/filter.js";


const getFilmCardCount = (count) => {
  return new Array(count).fill(``).map(getFilmCard);
};

let filmsCardArray = getFilmCardCount(MOCKCOUNT);

const mainFilter = generateNavigationFilter(filmsCardArray);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createProfileTemplate(), `beforeend`);
render(siteMainElement, createNavigationTemplate(mainFilter), `beforeend`);
render(siteMainElement, createFilterTemplate(), `beforeend`);
render(siteMainElement, createFilmListTemplate(), `beforeend`);

const siteFilmListElement = document.querySelector(`.films-list`);
const siteFilmConteinerElement = siteFilmListElement.querySelector(`.films-list__container`);

for (let i = 0; i < CARDS_COUNT; i++) {
  render(siteFilmConteinerElement, createFilmCardTemplate(filmsCardArray[i]), `beforeend`);
}

if (filmsCardArray.length > CARDS_COUNT) {
  let renderedCardsCount = CARDS_COUNT;
  render(siteFilmListElement, createShowMoreButton(), `beforeend`);
  const showMoreButton = document.querySelector(`.films-list__show-more`);
  showMoreButton.addEventListener(`click`, evt function (

  ));
}


const siteFilmsElement = document.querySelector(`.films`);

render(siteFilmsElement, createTopRatedTemplate(), `beforeend`);
render(siteFilmsElement, createMostCommentedTemplate(), `beforeend`);

const filmListExtra = siteMainElement.querySelectorAll(`.films-list--extra`);
const filmListTopContainer = filmListExtra[0].querySelector(`.films-list__container`);
const filmListCommendContainer = filmListExtra[1].querySelector(`.films-list__container`);


for (let i = 0; i < CARDS_IN_BLOCK_COUNT; i++) {
  render(filmListCommendContainer, createFilmCardTemplate(filmsCardArray[i]), `beforeend`);
  render(filmListTopContainer, createFilmCardTemplate(filmsCardArray[i]), `beforeend`);
}

const siteFooterElement = document.querySelector(`.footer`);

render(siteFooterElement, createMovieAmountTemplate(), `beforeend`);
// render(siteFooterElement, createFilmPopupTemplate(filmsCardArray[0]), `afterend`);
