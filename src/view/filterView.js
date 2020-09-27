import {MenuItem} from "../const.js";
import Smart from "./smart.js";
const filterButtonActiveClass = `main-navigation__item--active`;
const statsButtonActiveClass = `main-navigation__item--active`;
const createMainNav = (filter, currentFilterType) => {
  const {watchlist, favorites, watched, all} = filter;
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#${all.type}"
          class="main-navigation__item ${currentFilterType === all.type ? filterButtonActiveClass : ``}"
          id="${all.type}">${all.name}
        </a>
        <a href="#${watchlist.type}"
          class="main-navigation__item ${currentFilterType === watchlist.type ? filterButtonActiveClass : ``}" id="${watchlist.type}"
      >${watchlist.name}
          <span class="main-navigation__item-count"">${watchlist.count}</span>
        </a>
        <a href="#${watched.type}"
        class="main-navigation__item ${currentFilterType === watched.type ? filterButtonActiveClass : ``}" id="${watched.type}"
    >${watched.name}
        <span class="main-navigation__item-count"">${watched.count}</span>
      </a>
      <a href="#${favorites.type}"
          class="main-navigation__item ${currentFilterType === favorites.type ? filterButtonActiveClass : ``}" id="${favorites.type}"
      >${favorites.name}
          <span class="main-navigation__item-count"">${favorites.count}</span>
        </a>
      </div>
      <a href="#stats" class="main-navigation__additional" id="${MenuItem.STATISTICS}">Stats</a>
    </nav>`
  );
};


export default class FilterView extends Smart {
  constructor(filter, currentFilterType) {
    super();
    this._filter = filter;
    this._currentFilter = currentFilterType;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this.statsClickHandler = this.statsClickHandler.bind(this);
  }

  getTemplate() {
    return createMainNav(this._filter, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.id);
    this._callback.filterClick();
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this._callback.filterClick = callback;
    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, this._filterTypeChangeHandler);
  }

  statsClickHandler(evt) {
    if (evt.target.tagName === `A`) {
      evt.preventDefault();
      this._callback.statsClick(evt.target.id);
    }
    this.getElement().querySelector(`.main-navigation__additional`).classList.add(statsButtonActiveClass);
    const activeFilter = this.getElement().querySelector(`.main-navigation__item--active`);
    if (activeFilter) {
      activeFilter.classList.remove(filterButtonActiveClass);
    }
  }

  setStatsClickHandler(callback) {
    this._callback.statsClick = callback;
    this.getElement().addEventListener(`click`, this.statsClickHandler);
  }

  restoreHandlers() {
    this.setStatsClickHandler(this._callback.statsClick);
  }

}
