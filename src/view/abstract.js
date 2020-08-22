import {
  createElement
} from "../utils/render.js";
export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't be  instantiate Abstrac, only concrete one.`);
    }
    this._element = null;
    this._callback = {};
  }
  getTemplate() {
    throw new Error(`Abstact method not implemented : getTemplate`);
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

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler.bind(this));
  }
}
