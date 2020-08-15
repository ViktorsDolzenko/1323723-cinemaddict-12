import {
  createElement
} from "../util.js";
export default class FooterStats {
  constructor(filmMock) {
    this._element = null;
    this._filmMock = filmMock;
  }

  getTemplate() {
    return (
      `<p> ${this._filmMock.length} movies inside</p>`
    );
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
