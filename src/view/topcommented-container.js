import {
  createElement
} from "../util.js";

export default class TopCommentedFilms {

  getTemplate() {
    return (`<section class="films-list--extra films-list--extra-commented">
<h2 class="films-list__title">Top commented</h2>
<div class="films-list__container films-list__container--top-commented">
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
