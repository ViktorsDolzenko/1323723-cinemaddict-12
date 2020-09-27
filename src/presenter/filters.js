import {FilterTypes, UpdateType} from "../const.js";
import {render, RenderPosition, remove, replace} from "../utils/render.js";
import FilterView from "../view/filterView.js";
import {filter} from "../utils/filter.js";

export default class Filters {
  constructor(container, filtersModel, filmsModel) {
    this._container = container;
    this._filtersModel = filtersModel;
    this._filmsModel = filmsModel;
    this._currentFiltersType = null;
    this.filtersComponent = null;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFiltersTypeChange = this._handleFiltersTypeChange.bind(this);
    this._filmsModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFiltersType = this._filtersModel.getFilter();
    const filters = this._getFilters();
    const prevFiltersComponent = this.filtersComponent;

    this.filtersComponent = new FilterView(filters, this._currentFiltersType);

    this.filtersComponent.setFilterTypeChangeHandler(this._handleFiltersTypeChange);
    this.filtersComponent.setStatsClickHandler(this._handleSiteMenuClick);
    if (prevFiltersComponent === null) {
      render(this._container, this.filtersComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.filtersComponent, prevFiltersComponent);
    remove(prevFiltersComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  disableCurrentFilter() {
    this._currentFiltersType = null;
  }

  _handleFiltersTypeChange(filtersType) {
    if (!filtersType) {
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
        name: `History`,
        count: filter[FilterTypes.WATCHED](films).length
      },
    };
  }
  setStatsClickHandler(handleSiteMenuClick) {
    this._handleSiteMenuClick = handleSiteMenuClick;
  }
}
