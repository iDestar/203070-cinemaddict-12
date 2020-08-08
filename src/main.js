
const CARDS_IN_BLOCK_COUNT = 2;
const CARDS_COUNT = 5;

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

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createProfileTemplate(), `beforeend`);
render(siteMainElement, createNavigationTemplate(), `beforeend`);
render(siteMainElement, createFilterTemplate(), `beforeend`);
render(siteMainElement, createFilmListTemplate(), `beforeend`);

const siteFilmListElement = document.querySelector(`.films-list`);
const siteFilmConteinerElement = siteFilmListElement.querySelector(`.films-list__container`);

for (let i = 0; i < CARDS_COUNT; i++) {
  render(siteFilmConteinerElement, createFilmCardTemplate(), `beforeend`);
}

render(siteFilmListElement, createShowMoreButton(), `beforeend`);

const siteFilmsElement = document.querySelector(`.films`);

render(siteFilmsElement, createTopRatedTemplate(), `beforeend`);
render(siteFilmsElement, createMostCommentedTemplate(), `beforeend`);

const filmListExtra = siteMainElement.querySelector(`.films-list--extra`);
const filmListExtraContainer = filmListExtra.querySelector(`.films-list__container`);


for (let i = 0; i < CARDS_IN_BLOCK_COUNT; i++) {
  render(filmListExtraContainer, createFilmCardTemplate(), `beforeend`);
}

const siteFooterElement = document.querySelector(`.footer`);

render(siteFooterElement, createMovieAmountTemplate(), `beforeend`);
// render(siteFooterElement, createFilmPopupTemplate(), `afterend`);
