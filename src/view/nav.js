import Abstract from "./abstract.js";

const createMainNav = (data, currentFilterType) => {
  const {watchlist, favorites, watched, all} = data;
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all"
          class="main-navigation__item ${!currentFilterType ? `main-navigation__item--active` : ``}"
          data-filter-type="${all.type}">All movies
        </a>
        <a href="#watchlist"
          class="main-navigation__item ${currentFilterType === watchlist.type ? `main-navigation__item--active` : ``}"
          data-filter-type="${watchlist.type}">Watchlist
          <span class="main-navigation__item-count"">${watchlist.count}</span>
        </a>
        <a href="#history"
          class="main-navigation__item ${currentFilterType === watched.type ? `main-navigation__item--active` : ``}"
          data-filter-type="${watched.type}">History
          <span class="main-navigation__item-count">${watched.count}</span>
        </a>
        <a href="#favorites"
          class="main-navigation__item ${currentFilterType === favorites.type ? `main-navigation__item--active` : ``}"
          data-filter-type="${favorites.type}">Favorites
          <span class="main-navigation__item-count">${favorites.count}</span>
        </a>
      </div>
    </nav>`
  );
};


export default class FilterView extends Abstract {
  constructor(data, currentFilterType) {
    super();

    this._data = data;
    this._currentFilter = currentFilterType;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createMainNav(this._data, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback(evt.target.dataset.filterType);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}
