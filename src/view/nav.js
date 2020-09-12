import Abstract from "./abstract.js";

const createMainNav = (filter, currentFilterType) => {
  const {watchlist, favorites, watched, all} = filter;
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#${all.type}"
          class="main-navigation__item ${currentFilterType === all.type ? `main-navigation__item--active` : ``}"
          id="${all.type}">${all.name}
        </a>
        <a href="#${watchlist.type}"
          class="main-navigation__item ${currentFilterType === watchlist.type ? `main-navigation__item--active` : ``}" id="${watchlist.type}"
      >${watchlist.name}
          <span class="main-navigation__item-count"">${watchlist.count}</span>
        </a>
        <a href="#${watched.type}"
        class="main-navigation__item ${currentFilterType === watched.type ? `main-navigation__item--active` : ``}" id="${watched.type}"
    >${watched.name}
        <span class="main-navigation__item-count"">${watched.count}</span>
      </a>
      <a href="#${favorites.type}"
          class="main-navigation__item ${currentFilterType === favorites.type ? `main-navigation__item--active` : ``}" id="${favorites.type}"
      >${favorites.name}
          <span class="main-navigation__item-count"">${favorites.count}</span>
        </a>
      </div>
    </nav>`
  );
};


export default class FilterView extends Abstract {
  constructor(filter, currentFilterType) {
    super();
    this._filter = filter;
    this._currentFilter = currentFilterType;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createMainNav(this._filter, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.id);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}
