import
FilmContainer
  from "../view/film-container.js";
import
TopRatedFilms
  from "../view/toprated-container.js";
import TopCommentedFilms
  from "../view/topcommented-container.js";
import
ShowMoreButton
  from "../view/button.js";
import NoData from "../view/no-data.js";
import
SortView
  from "../view/sort.js";
import {
  SortType, UpdateType, UserAction
} from "../const.js";
import {sortByRating, sortByDate} from "../utils/sortFunction.js";
import {
  render,
  RenderPosition,
  remove,
} from "../utils/render.js";
import {filter} from "../utils/filter.js";

import FilmPresenter from "./film.js";
import Loading from "../view/loading.js";

const pageMain = document.querySelector(`.main`);
const FILM_COUNT_PER_STEP = 5;

export default class Board {
  constructor(boardContainer, filmsModel, filtersModel, commentsModel, api) {
    this._filtersModel = filtersModel;
    this._filmsModel = filmsModel;
    this._showMoreButtonComponent = null;
    this._boardContainer = boardContainer;
    this._filmContainerComponent = new FilmContainer();
    this._topRatedComponent = null;
    this._topCommentedComponent = null;
    this._noDataComponent = new NoData();
    this._sortComponent = new SortView();
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._filmPresenter = {};
    this._topFilmPresenter = {};
    this._topCommentedPresenter = {};
    this._filmList = this._filmContainerComponent.getElement().querySelector(`.films-list`);
    this._filmListContainer = this._filmContainerComponent.getElement().querySelector(`.films-list__container`);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._filmsModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);
    this._commentsModel = commentsModel;
    this._currentSortType = SortType.DEFAULT;
    this._topRatedComponent = new TopRatedFilms();
    this._topCommentedComponent = new TopCommentedFilms();
    this._isLoading = true;
    this._loadingComponent = new Loading();
    this._api = api;
  }

  init() {
    this._renderSort();
    render(pageMain, this._filmContainerComponent, RenderPosition.BEFOREEND);
    this._renderBoard();
    render(this._filmContainerComponent, this._topRatedComponent, RenderPosition.BEFOREEND);
    render(this._filmContainerComponent, this._topCommentedComponent, RenderPosition.BEFOREEND);
    this._topRatedFilms();
    this._topCommentedfilms();
  }


  _getFilms() {
    const filterType = this._filtersModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filteredFilms = filter[filterType](films);
    switch (this._currentSortType) {
      case SortType.RATING:
        return filteredFilms.slice().sort(sortByRating);
      case SortType.DATE:
        return filteredFilms.slice().sort(sortByDate);
      default:
        return filteredFilms;
    }
  }
  _renderCard(filmListContainer, film, holder) {
    const filmPresenter = new FilmPresenter(this._handleViewAction, this._handleModeChange, this._api);
    filmPresenter.init(filmListContainer, film);
    holder[film.id] = filmPresenter;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._api.updateFilm(update).then((response) => {
          this._filmsModel.updateFilm(updateType, response);
        });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmPresenter[data.id].init(null, data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this.init();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this.init();
        break;
    }
  }


  _topRatedFilms() {
    this._topRatedListContainer = this._topRatedComponent.getElement().querySelector(`.films-list__container--top-rated`);
    this._getFilms().sort((a, b) => b.score - a.score).slice(0, 2).forEach((element) => {
      this._renderCard(this._topRatedListContainer, element, this._topFilmPresenter);
    });
  }

  _topCommentedfilms() {
    this._topCommentedContainer = this._topCommentedComponent.getElement().querySelector(`.films-list__container--top-commented`);
    this._getFilms().sort((a, b) => b.comments.length - a.comments.length).slice(0, 2).forEach((element) => {
      this._renderCard(this._topCommentedContainer, element, this._topCommentedPresenter);
    });
  }


  _noFilms() {
    this._filmListContainer = this._filmContainerComponent.getElement().querySelector(`.films-list__container`);
    render(this._filmListContainer, this._noDataComponent, RenderPosition.BEFOREEND);
  }

  _showMoreFilms() {
    this._filmListContainer = this._filmContainerComponent.getElement().querySelector(`.films-list__container`);
    let counter = 0;
    const filmCount = this._getFilms().length;
    const addFilms = () => {
      if (filmCount < 1) {
        this._noFilms();
      } else {
        this._getFilms().slice(counter, counter + FILM_COUNT_PER_STEP).forEach((element) => {
          this._renderCard(this._filmListContainer, element, this._filmPresenter);
        });
      }
      counter += FILM_COUNT_PER_STEP;
      if (counter >= filmCount) {
        remove(this._showMoreButtonComponent);
      }
    };
    return addFilms;
  }

  _showMoreFilmsHandler() {
    this._filmList = this._filmContainerComponent.getElement().querySelector(`.films-list`);
    this._showMoreButtonComponent = new ShowMoreButton();
    this._showMoreButtonComponent.setClickHandler(this._onClickShowMoreFilms);
    render(this._filmList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearFilmsBoard();
    this.init();
  }

  _renderLoading() {
    render(this._filmListContainer, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _clearFilmsBoard() {
    Object.values(this._filmPresenter).forEach((presenter) => presenter.destroy());
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this._showMoreButtonComponent);
    remove(this._topRatedComponent);
    remove(this._topCommentedComponent);
  }


  _clearBoard({resetRenderedFilmCount: resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    remove(this._sortComponent);
    remove(this._topRatedComponent);
    remove(this._topCommentedComponent);
    remove(this._loadingComponent);
    remove(this._showMoreButtonComponent);
    if (resetRenderedFilmCount) {
      this._renderedFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this._renderedFilmCount = Math.min(filmCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderBoard() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
    const films = this._getFilms();
    const filmCount = films.length;
    if (filmCount === 0) {
      this._noFilms();
      return;
    }

    this._onClickShowMoreFilms = this._showMoreFilms().bind(this);
    this._onClickShowMoreFilms();
    if (filmCount >= this._renderedFilmCount) {
      this._showMoreFilmsHandler();
    }
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.closePopupitems());
  }

  _renderFilters() {
    render(this._boardContainer, this._filterComponent, RenderPosition.AFTERBEGIN);
  }


  destroy() {
    remove(this._sortComponent);
    remove(this._filmContainerComponent);
    remove(this._topRatedComponent);
    remove(this._topCommentedComponent);
  }
}


