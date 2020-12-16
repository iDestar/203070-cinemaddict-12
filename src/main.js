import { profileComponent } from "./view/profile-component";
import { mainMenuComponent } from "./view/main-menu-component";
import { sortComponent } from "./view/sort-component";
import { filmSectionComponent } from "./view/film-section-component";
import { filmListSectionComponent } from "./view/film-list-section-component";
import { filmListContainerComponent } from "./view/film-list-container-component";
import { filmCardComponent } from "./view/film-card-component";
import { showMoreButtonComponent } from "./view/show-more-button-component";
import { footerComponent } from "./view/footer-component";

const CARD_COUNT = 5;
const header = document.querySelector(".header");
const main = document.querySelector(".main");

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(header, profileComponent(), `beforeend`);
render(main, mainMenuComponent(), `beforeend`);
render(main, sortComponent(), `beforeend`);

render(main, filmSectionComponent(), `beforeend`);

const filmSection = document.querySelector(".films");

render(filmSection, filmListSectionComponent(), `beforeend`);

const filmListSection = document.querySelector(".films-list");

render(filmListSection, filmListContainerComponent(), `beforeend`);

const filmListContainer = document.querySelector(".films-list__container");

function filmCardRender() {
  for (let i = 0; i < CARD_COUNT; i++) {
    render(filmListContainer, filmCardComponent(), `beforeend`);
  }
}

filmCardRender();

render(filmListSection, showMoreButtonComponent(), `beforeend`);

render(main, footerComponent(), `beforeend`);
