import {SortType} from "../const.js";
import Smart from "./smart.js";

export default class SortView extends Smart {
  constructor(active = `default`) {
    super();
    this._isActive = active;
    this._onClickSortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._currentSortType = SortType.DEFAULT;
  }
  getTemplate() {
    return (`<ul class="sort">
    <li><a href="#" class="sort__button ${this._currentSortType === SortType.DEFAULT ? `sort__button--active` : ``}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${this._currentSortType === SortType.DATE ? `sort__button--active` : ``} " data-sort-type="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${this._currentSortType === SortType.RATING ? `sort__button--active` : ``}" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
    </ul>`);
  }
  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._changeActive(evt.target);
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  _changeActive(target) {
    // this.getElement().querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);
    // target.classList.add(`sort__button--active`);
    this._currentSortType = target.dataset.sortType;
    this.updateElement();
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._onClickSortTypeChangeHandler);
  }
  restoreHandlers() {
    this.setSortTypeChangeHandler(this._callback.sortTypeChange);
  }
}
