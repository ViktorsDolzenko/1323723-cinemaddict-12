import {
  createElement
} from '../util.js';
export default class NewFilm {
  constructor({
    title,
    poster,
    description,
    score,
    year,
    genre,
    duration,
    commentsCount,
  }) {
    this._element = null;
    this._title = title;
    this._poster = poster;
    this._description = description;
    this._score = score;
    this._year = year;
    this._genre = genre;
    this._duration = duration;
    this._commentsCount = commentsCount;
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
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active">Mark as favorite</button>
  </form>
</article>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
