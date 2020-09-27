import Abstract from "./abstract.js";
export default class ShowMoreButton extends Abstract {

  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }
  _clickHandler(evt) {
    this._callback.click(evt);
  }
}
