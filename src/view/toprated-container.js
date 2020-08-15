import {
  createElement
} from "../util.js";
export default class TopRatedFilms {

  getTemplate() {
    return (
      `<section class="films-list--extra films-list--extra-rating">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container films-list__container--top-rated">
      </div>
      </section>`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
