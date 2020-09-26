import NewFilm
  from "../view/new-film.js";
import FilmDetails
  from "../view/film-details.js";
import {
  render,
  RenderPosition,
  showPopup,
  remove,
  replace
} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";
import CommentsModel from "../model/comment.js";
const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};


export default class Film {
  constructor(changeData, handleModeChange, api) {
    this._filmComponent = null;
    this._detailsComponent = null;
    this._mode = Mode.DEFAULT;
    this._changeData = changeData;
    this._handleModeChange = handleModeChange;
    this._openPopupHandler = this._openPopupHandler.bind(this);
    this._closePopupHandler = this._closePopupHandler.bind(this);
    this._closeDetailsKey = this._closeDetailsKey.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._commentsModel = new CommentsModel();
    this._api = api;
  }
  init(filmListContainer, film) {
    this._film = film;
    this._filmListContainer = filmListContainer;
    const prevFilmComponent = this._filmComponent;
    const prevDetailsComponent = this._detailsComponent;
    this._filmComponent = new NewFilm(film);
    this._detailsComponent = new FilmDetails(film, this._commentsModel, this._api);
    this._filmComponent.openPopupHandler(this._openPopupHandler);
    this._filmComponent.setWatchListClickHandler(this._watchListClickHandler);
    this._filmComponent.setFavoriteClickHandler(this._favoriteClickHandler);
    this._filmComponent.setWatchedClickHandler(this._watchedClickHandler);

    if (prevFilmComponent === null || prevDetailsComponent === null) {
      render(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }
    replace(this._filmComponent, prevFilmComponent);
    replace(this._detailsComponent, prevDetailsComponent);
    remove(prevFilmComponent);
    remove(prevDetailsComponent);
  }


  _closeDetailsKey(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      remove(this._detailsComponent);
      document.removeEventListener(`keydown`, this._closeDetailsKey);
    }
  }

  _openDetails() {
    this._api.getComments(this._film.id)
    .then((comments) => {
      this._mode = Mode.EDITING;
      this._handleModeChange();
      this._commentsModel.setComments(comments);
      showPopup(this._detailsComponent);
      this._detailsComponent.cardHandler(this._closePopupHandler);
      this._detailsComponent.restoreHandlers();
    });
  }

  _closeDetails() {
    remove(this._detailsComponent);
    this._mode = Mode.DEFAULT;
    document.removeEventListener(`keydown`, this._closeDetailsKey);
  }

  _openPopupHandler() {
    this._openDetails();
  }

  _closePopupHandler(film) {
    this._changeData(UserAction.UPDATE_FILM, UpdateType.MAJOR, film);
    this._closeDetails();
  }

  closePopupitems() {
    this._closeDetails();
  }

  _favoriteClickHandler() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MAJOR,
        Object.assign({},
            this._film, {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  _watchListClickHandler() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MAJOR,
        Object.assign({},
            this._film, {
              isWatchlist: !this._film.isWatchlist
            }
        )
    );
  }
  _watchedClickHandler() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MAJOR,
        Object.assign({},
            this._film, {
              isWatched: !this._film.isWatched
            }
        )
    );
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._detailsComponent);
  }


}


