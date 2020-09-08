import AbstractView from "./abstract.js";
import {userRank} from '../utils.js';

const createProfileTemplate = (filmsViewed) => {
  return `<section class="header__profile profile">
    <p class="profile__rating">${userRank(filmsViewed)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};


export default class Profile extends AbstractView {
  constructor(filmsViewed) {
    super();
    this._filmsViewed = filmsViewed;
  }

  _getTemplate() {
    return createProfileTemplate(this._filmsViewed);
  }
}
