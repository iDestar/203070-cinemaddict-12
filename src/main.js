const MOCKCOUNT = 18;
import ProfileView from "./view/profile.js";
import NavigationView from "./view/navigation.js";
import BoardPresenter from "./presenter/board.js";
import MovieAmountView from "./view/movie-amount.js";
import {getFilmCard} from "./mock/card.js";
import {render, RenderPosition} from "./utils.js";
import {generateNavigationFilter} from "./mock/filter.js";


const getFilmCardCount = (count) => {
  return new Array(count).fill(``).map(getFilmCard);
};

const filmsCardArray = getFilmCardCount(MOCKCOUNT);

const mainFilter = generateNavigationFilter(filmsCardArray);


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const siteHeaderComponent = new ProfileView();
render(siteHeaderElement, siteHeaderComponent, RenderPosition.BEFOREEND);


const navigationComponent = new NavigationView(mainFilter);
render(siteMainElement, navigationComponent, RenderPosition.BEFOREEND);


const boardPresenter = new BoardPresenter(siteMainElement);
boardPresenter.init(filmsCardArray);


const footerStatComponent = new MovieAmountView(filmsCardArray);
render(siteFooterElement, footerStatComponent, RenderPosition.BEFOREEND);
