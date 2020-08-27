import Abstract from "./abstract.js";
import {SortType} from "../const.js";
export default class SortView extends Abstract {
  constructor() {
    super();
    this._onClickSortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }
  getTemplate() {
    return (`<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
    </ul>`);
  }
  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }
    evt.preventDefault();
    this.getElement().querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);
    evt.target.classList.add(`sort__button--active`);
    this._callback(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback = callback;
    this.getElement().addEventListener(`click`, this._onClickSortTypeChangeHandler);
  }
}
