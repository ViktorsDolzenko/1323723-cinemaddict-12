import NewFilm
  from "../view/new-film.js";
import FilmDetails
  from "../view/film-details.js";

import {
  render,
  RenderPosition,
  showPopup,
  closePopup,
  remove,
  replace
} from "../utils/render.js";
import Smart from "../view/smart.js";


export default class Film extends Smart {
  constructor(changeData) {
    super();
    this._filmComponent = null;
    this._detailsComponent = null;
    this._changeData = changeData;
    this._openPopupHandler = this._openPopupHandler.bind(this);
    this._closePopupHandler = this._closePopupHandler.bind(this);
    this._closeDetailsKey = this._closeDetailsKey.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
  }
  init(filmListContainer, film) {
    this._film = film;
    this._filmListContainer = filmListContainer;
    const prevFilmComponent = this._filmComponent;
    const prevDetailsComponent = this._detailsComponent;
    this._filmComponent = new NewFilm(film);
    this._detailsComponent = new FilmDetails(film);
    this._filmComponent.openPopupHandler(this._openPopupHandler);
    this._filmComponent.setWatchListClickHandler(this._watchListClickHandler);
    this._filmComponent.setFavoriteClickHandler(this._favoriteClickHandler);
    this._filmComponent.setWatchedClickHandler(this._watchedClickHandler);
    this._detailsComponent.cardHandler(this._closePopupHandler);

    if (prevFilmComponent === null || prevDetailsComponent === null) {
      render(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }
    replace(this._filmComponent, prevFilmComponent);
    replace(this._detailsComponent, prevDetailsComponent);

  }

  destroy() {
    remove(this._filmComponent);
    remove(this._detailsComponent);
  }


  _closeDetailsKey(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      closePopup(this._detailsComponent);
      document.removeEventListener(`keydown`, this._closeDetailsKey);
    }
  }

  _openDetails() {
    showPopup(this._detailsComponent);
    document.addEventListener(`keydown`, this._closeDetailsKey);
  }

  _closeDetails(film) {
    closePopup(this._detailsComponent);
    this.updateData(film);
    document.removeEventListener(`keydown`, this._closeDetailsKey);
  }

  _openPopupHandler() {
    this._openDetails();
  }

  _closePopupHandler(film) {
    this._closeDetails(film);
  }
}


