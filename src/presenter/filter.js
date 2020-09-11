import {FilterTypes, UpdateType} from "../const.js";
import {render, RenderPosition, remove, replace} from "../utils/render.js";
import FilterView from "../view/nav.js";
import {filter} from "../utils/filter.js";


export default class FilterPresenter {
  constructor(container, filtersModel, filmsModel, board) {
    this._container = container;
    this._filtersModel = filtersModel;
    this._filmsModel = filmsModel;
    this._filters = this._filtersModel.getFilter();
    this._board = board;
    this._filtersComponent = null;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFiltersTypeChange = this._handleFiltersTypeChange.bind(this);
    this._filmsModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFiltersType = this._filtersModel.getFilter();
    const filters = this._getFilters();
    const prevFiltersComponent = this._filtersComponent;

    this._filtersComponent = new FilterView(filters, this._currentFiltersType);

    this._filtersComponent.setFilterTypeChangeHandler(this._handleFiltersTypeChange);

    if (prevFiltersComponent === null) {
      render(this._container, this._filtersComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._filtersComponent, prevFiltersComponent);
    remove(prevFiltersComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFiltersTypeChange(filtersType) {
    if (this._currentFilter === filtersType) {
      return;
    }

    this._filtersModel.setFilter(UpdateType.MAJOR, filtersType);
  }


  getWatchedCount() {
    return this._getFilters().watched.count;
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();

    return {
      all: {
        type: FilterTypes.ALL,
        name: `All Movies`,
        count: ``
      },
      favorites: {
        type: FilterTypes.FAVORITES,
        name: `Favorites`,
        count: filter[FilterTypes.FAVORITES](films).length
      },
      watchlist: {
        type: FilterTypes.WATCHLIST,
        name: `Watchlist`,
        count: filter[FilterTypes.WATCHLIST](films).length
      },
      watched: {
        type: FilterTypes.WATCHED,
        name: `Watched`,
        count: filter[FilterTypes.WATCHED](films).length
      },
    };
  }

  destroy() {
    remove(this._filtersComponent);
  }
}
