const MOCKCOUNT = 18;
import ProfileView from "./view/profile.js";
import BoardPresenter from "./presenter/board.js";
import MovieAmountView from "./view/movie-amount.js";
import {getFilmCard} from "./mock/card.js";
import {render} from "./utils.js";

import FilmsModel from './model/films.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const getFilmCardCount = (count) => {
  return new Array(count).fill(``).map(getFilmCard);
};

const filmsCardArray = getFilmCardCount(MOCKCOUNT);
const filmsViewed = filmsCardArray.filter((film) => film.isViewed).length;

const filmsModel = new FilmsModel();
filmsModel.setFilms(filmsCardArray);

const filterModel = new FilterModel();


render(siteHeaderElement, new ProfileView(filmsViewed));

const filmsListPresenter = new BoardPresenter(siteMainElement, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);

filterPresenter.init();
filmsListPresenter.init(filmsCardArray);

render(siteFooterElement, new MovieAmountView(filmsViewed).getElement());
