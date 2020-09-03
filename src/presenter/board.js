import
FilmContainer
  from "../view/film-container.js";

import
TopRatedFilms
  from "../view/toprated-container.js";
import TopCommentedFilms
  from "../view/topcommented-container.js";
import {updateItem} from "../utils/common.js";
import
ShowMoreButton
  from "../view/button.js";
import NoData from "../view/no-data.js";
import
SortView
  from "../view/sort.js";
import {
  SortType
} from "../const.js";
import {sortByRating, sortByDate} from "../utils/sortFunction.js";
import {
  render,
  RenderPosition,
} from "../utils/render.js";

import FilmPresenter from "./film.js";

const pageMain = document.querySelector(`.main`);

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._filmContainerComponent = new FilmContainer();
    this._topRatedComponent = new TopRatedFilms();
    this._topCommentedComponent = new TopCommentedFilms();
    this._noDataComponent = new NoData();
    this._filmPresenter = {};
    this._topCommentedPresenter = {};
    this._topRatedPresenter = {};
    this._onClickShowMoreFilms = this._showMoreFilms().bind(this);
    this._filmList = this._filmContainerComponent.getElement().querySelector(`.films-list`);
    this._filmListContainer = this._filmContainerComponent.getElement().querySelector(`.films-list__container`);
    this._topRatedContainer = this._topRatedComponent.getElement().querySelector(`.films-list__container--top-rated`);
    this._topCommentedContainer = this._topCommentedComponent.getElement().querySelector(`.films-list__container--top-commented`);
    this._sortComponent = new SortView();
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();
    this._sourcedBoardFilms = boardFilms.slice();
    this._renderSort();
    this._currentSortType = SortType.DEFAULT;
    render(pageMain, this._filmContainerComponent, RenderPosition.BEFOREEND);
    render(this._filmContainerComponent, this._topRatedComponent, RenderPosition.BEFOREEND);
    render(this._filmContainerComponent, this._topCommentedComponent, RenderPosition.BEFOREEND);
    this._topRatedFilms();
    this._topCommentedfilms();
    this._onClickShowMoreFilms();
    this._showMoreFilmsHandler();
  }

  _renderCard(filmListContainer, film, holder) {
    const filmPresenter = new FilmPresenter(this._handleFilmChange);
    filmPresenter.init(filmListContainer, film);
    holder[film.id] = filmPresenter;
  }

  _handleFilmChange(updatedTask) {
    this._boardFilms = updateItem(this._boardFilms, updateItem);
    this._sourcedBoardFilms = updateItem(this._sourcedBoardFilms, updateItem);
    this._filmPresenter[updatedTask.id].init(null, updatedTask);
  }
  _topRatedFilms() {
    this._boardFilms.sort((a, b) => b.score - a.score).slice(0, 2).forEach((element) => {
      this._renderCard(this._topRatedContainer, element, this._topRatedPresenter);
    });
  }

  _topCommentedfilms() {
    this._boardFilms.sort((a, b) => b.commentsCount - a.commentsCount).slice(0, 2).forEach((element) => {
      this._renderCard(this._topCommentedContainer, element, this._topCommentedPresenter);
    });
  }


  _showMoreFilms() {
    let counter = 0;
    const addFilms = () => {
      if (this._boardFilms.length < 1) {
        render(this._filmListContainer, this._noDataComponent, RenderPosition.BEFOREEND);

      } else {
        this._boardFilms.slice(counter, counter + 5).forEach((element) => {
          this._renderCard(this._filmListContainer, element, this._filmPresenter);
        });
      }
      counter += 5;
      if (counter >= this._boardFilms.length) {
        this._showMoreButtonComponent.getElement().remove();
      }
    };
    return addFilms;
  }

  _showMoreFilmsHandler() {
    this._showMoreButtonComponent = new ShowMoreButton();
    render(this._filmList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._onClickShowMoreFilms);
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.RATING:
        this._boardFilms.sort(sortByRating);
        break;
      case SortType.DATE:
        this._boardFilms.sort(sortByDate);
        break;
      default:
        this._boardFilms = this._sourcedBoardFilms.slice();
    }

    this._currentSortType = sortType;
  }


  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortFilms(sortType);
    this._clearFilmsBoard();
    this._showMoreButtonComponent.getElement().remove();
    this._showMoreFilmsHandler();
    this._onClickShowMoreFilms();
    this._onClickShowMoreFilms = this._showMoreFilms().bind(this);
  }
  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _clearFilmsBoard() {
    Object.values(this._filmPresenter).forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
  }

}


