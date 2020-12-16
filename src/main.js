import { profileComponent } from "./view/profile-component";
import { mainMenuComponent } from "./view/main-menu-component";
import { sortComponent } from "./view/sort-component";
import { filmListSectionComponent } from "./view/film-section-component";

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

const filmListSectionComponent = () => {
  return `<section class="films-list"></section>`;
};

render(filmSection, filmListSectionComponent(), `beforeend`);

const filmListSection = document.querySelector(".films-list");

const filmListContainerComponent = () => {
  return '<div class="films-list__container"></div>';
};

render(filmListSection, filmListContainerComponent(), `beforeend`);

const filmListContainer = document.querySelector(".films-list__container");

const filmCard = () => {
  return `<article class="film-card">
          <h3 class="film-card__title">The Dance of Life</h3>
          <p class="film-card__rating">8.3</p>
          <p class="film-card__info">
            <span class="film-card__year">1929</span>
            <span class="film-card__duration">1h 55m</span>
            <span class="film-card__genre">Musical</span>
          </p>
          <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
          <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
          <a class="film-card__comments">5 comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>`;
};

function filmCardRender() {
  for (let i = 0; i < CARD_COUNT; i++) {
    render(filmListContainer, filmCard(), `beforeend`);
  }
}

filmCardRender();

const showMoreButtonComponent = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

render(filmListSection, showMoreButtonComponent(), `beforeend`);

const footerElement = () => {
  return `<footer class="footer">
    <section class="footer__logo logo logo--smaller">Cinemaddict</section>
    <section class="footer__statistics">
      <p>130 291 movies inside</p>
    </section>
  </footer>`;
};

render(main, footerElement(), `beforeend`);
