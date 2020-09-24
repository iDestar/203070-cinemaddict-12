import ProfileView from "./view/profile.js";
import BoardPresenter from "./presenter/board.js";
import MovieAmountView from "./view/movie-amount.js";
import {render} from "./utils.js";
import Api from './api.js';
import {UpdateType} from './const.js';

import FilmsModel from './model/films.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';

const URL = `https://12.ecmascript.pages.academy/cinemaddict`;
const AUTH = `Basic sdfdsf!`;


const api = new Api(URL, AUTH);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const filmsModel = new FilmsModel();

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
    const filmsViewed = filmsModel.getFilms().filter((film) => film.isViewed).length;
    render(siteHeaderElement, new ProfileView(filmsViewed));
    render(siteFooterElement, new MovieAmountView(filmsModel.getFilms().length));
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
    render(siteHeaderElement, new ProfileView(filmsModel.getFilms()));
    render(siteFooterElement, new MovieAmountView(filmsModel.getFilms().length));
  });
const filterModel = new FilterModel();

const filmsListPresenter = new BoardPresenter(siteMainElement, filmsModel, filterModel, api);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel, filmsListPresenter);

filterPresenter.init();
filmsListPresenter.init();
