import Abstract from "./abstract.js";
import moment from "moment";

export default class NewFilm extends Abstract {
  constructor(film) {
    super();
    const {
      title,
      poster,
      description,
      score,
      year,
      genre,
      duration,
      commentsCount,
      isFavorite,
      isWatchlist,
      isWatched,
    } = film;
    this._element = null;
    this._title = title;
    this._poster = poster;
    this._description = description;
    this._score = score;
    this._genre = genre;
    this._commentsCount = commentsCount;
    this._isFavorite = isFavorite;
    this._isWatchlist = isWatchlist;
    this._isWatched = isWatched;
    this._onClickHandler = this._openClickHandler.bind(this);
    this._watchListFilmsClickHandler = this._watchListClickHandler.bind(this);
    this._favoriteFilmsClickHandler = this._favoriteClickHandler.bind(this);
    this._watchedFilmsClickHandler = this._watchedClickHandler.bind(this);
    const durationMoment = moment.duration(duration, `minutes`);
    this._duration = moment.utc(durationMoment.as(`milliseconds`)).format(`H[h] m[m]`);
    this._year = year;
  }


  getTemplate() {
    return (
      `<article class="film-card">
  <h3 class="film-card__title">${this._title}</h3>
  <p class="film-card__rating">${this._score}</p>
  <p class="film-card__info">
    <span class="film-card__year">${this._year}</span>
    <span class="film-card__duration">${this._duration}</span>
    <span class="film-card__genre">${this._genre}</span>
  </p>
  <img src=${this._poster} alt="" class="film-card__poster">
  <p class="film-card__description">${this._description}</p>
  <a class="film-card__comments">${this._commentsCount} comments</a>
  <form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._isWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._isWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item ${this._isFavorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
  </form>
</article>`
    );
  }
  _openClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  openPopupHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`).forEach((element) => {
      element.addEventListener(`click`, this._onClickHandler);
    });
  }


  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._watchListFilmsClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteFilmsClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._watchedFilmsClickHandler);
  }
}
