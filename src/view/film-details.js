import Smart from "./smart.js";
import {formatCommentDate} from "../utils/comment.js";
import moment from "moment";
import FilmsModel from "../model/films";
import {
  UserAction
} from "../const.js";
import he from "he";
const KeyCode = {
  ENTER: 13
};


export default class FilmDetails extends Smart {
  constructor(film, commentsModel, api) {
    super();
    const {
      id,
      title,
      titleAlternative,
      poster,
      description,
      score,
      year,
      genre,
      duration,
      actors,
      writers,
      director,
      isFavorite,
      isWatchlist,
      isWatched,
      country,
      age,
    } = film;
    this._title = title;
    this._titleAlternative = titleAlternative;
    this._poster = poster;
    this._description = description;
    this._score = score;
    this._year = year;
    this._genre = genre;
    this.id = id;
    this._api = api;
    const durationMoment = moment.duration(duration, `minutes`);
    this._duration = moment.utc(durationMoment.as(`milliseconds`)).format(`H[h] m[m]`);
    this._actors = actors;
    this._writers = writers;
    this._director = director;
    this._country = country;
    this._isFavorite = isFavorite;
    this._isWatchlist = isWatchlist;
    this._isWatched = isWatched;
    this._age = age;
    this._commentModel = commentsModel;
    this._clickHandler = this._clickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._commentDeleteHandler = this._commentDeleteHandler.bind(this);
    this._film = film;
    this._callback = {};
    this._setInnerHandlers();
  }


  _createComment(comment) {

    const filmCommentDate = formatCommentDate(comment.date);

    return (
      `<li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
          </span>
          <div>
            <p class="film-details__comment-text">${he.encode(comment.comment)}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${comment.author}</span>
              <span class="film-details__comment-day">${filmCommentDate}</span>
              <button class="film-details__comment-delete" data-id-type="${comment.id}">Delete</button>
            </p>
          </div>
        </li>`
    );
  }

  getTemplate() {
    return (
      `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src=${this._poster} alt="">

          <p class="film-details__age">${this._age}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${this._title}</h3>
              <p class="film-details__title-original">${this._titleAlternative}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${this._score}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${this._director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${this._writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${this._actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${moment(this._year).format(`yyyy`)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${this._duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${this._country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${this._genre}</span>
                </td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${this._description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" ${this._film.isWatchlist ? `checked` : ``} id="watchlist-checkbox" name="watchlist">
        <label for="watchlist-checkbox" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" ${this._film.isWatched ? `checked` : ``} id="watched-checkbox" name="watched">
        <label for="watched-checkbox" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" ${this._film.isFavorite ? `checked` : ``} id="favorite-checkbox" name="favorite">
        <label for="favorite-checkbox" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="form-details__bottom-container">
    <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._commentModel.getComments().length}</span></h3>
    <ul class="film-details__comments-list">
      ${this._commentModel.getComments().map(this._createComment).join(``)}
               </ul>
              <div class="film-details__new-comment">
                <div for="add-emoji" class="film-details__add-emoji-label"></div>
                <label class="film-details__comment-label">
                  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" required></textarea>
                </label>
                <div class="film-details__emoji-list">
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" required>
                  <label class="film-details__emoji-label" for="emoji-smile">
                    <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                  </label>
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                  <label class="film-details__emoji-label" for="emoji-sleeping">
                    <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                  </label>
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                  <label class="film-details__emoji-label" for="emoji-puke">
                    <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                  </label>
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                  <label class="film-details__emoji-label" for="emoji-angry">
                    <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                  </label>
                </div>
              </div>
            </section>
          </div>
        </form>
    </section>`
    );
  }
  _clickHandler(evt) {
    evt.preventDefault();
    document.body.classList.remove(`hide-overflow`);
    this._callback.click(this._film);
  }


  cardHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._clickHandler);
  }


  _setInnerHandlers() {
    this.getElement().querySelector(`#watchlist-checkbox`).addEventListener(`change`, this._watchlistClickHandler);
    this.getElement().querySelector(`#watched-checkbox`).addEventListener(`change`, this._watchedClickHandler);
    this.getElement().querySelector(`#favorite-checkbox`).addEventListener(`change`, this._favoriteClickHandler);
    this.getElement().querySelector(`.film-details__comment-input`)
    .addEventListener(`keydown`, this._commentInputHandler);

    this.getElement().querySelector(`.film-details__comments-list`).addEventListener(`click`, this._commentDeleteHandler);

    this.getElement().querySelector(`.film-details__emoji-list`)
    .addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `INPUT`) {
        this._emojiClickHandler(evt.target.value);
      }
    });

    this.cardHandler(this._callback.click);
  }

  _watchlistClickHandler() {
    this.updateData({
      isWatchlist: !this._film.isWatchlist
    }, true);
  }

  _watchedClickHandler() {
    this.updateData({
      isWatched: !this._film.isWatched
    }, true);
  }

  _favoriteClickHandler() {
    this.updateData({
      isFavorite: !this._film.isFavorite
    }, true);
  }

  _emojiClickHandler(src) {
    const emojiContainer = this.getElement().querySelector(`.film-details__add-emoji-label`);
    const emoji = `<img src="images/emoji/${src}.png" width="55" height="55" alt="emoji">`;
    emojiContainer.innerHTML = emoji;
  }
  _commentInputHandler(evt) {
    if (evt.keyCode === KeyCode.ENTER && (evt.ctrlKey || evt.metaKey)) {
      evt.preventDefault();

      const inputComment = evt.target.value;
      const emojiSelector = this.getElement().querySelector(`.film-details__emoji-list input:checked`);
      const inputSelector = this.getElement().querySelector(`.film-details__comment-input`);
      const popup = this.getElement();
      if (inputSelector.length < 1 || !emojiSelector) {
        popup.style.animation = `shake 2s`;
        return;
      }
      const emojiImg = emojiSelector.value;
      const newComment = {
        author: ``,
        time: parseInt(new Date().getTime(), 10),
        text: inputComment,
        emoji: emojiImg,
        filmId: this.id,
      };

      inputSelector.disabled = true;
      this._api.addComment(newComment)
      .then((filmData) =>{
        this._film = FilmsModel.adaptToClient(filmData.movie);
        this._commentModel.setComments(filmData.comments);
        this.updateElement();
        inputSelector.disabled = false;
        inputSelector.value = ``;
      })
      .catch(()=>{
        popup.style.animation = `shake 2s`;
        inputSelector.disabled = false;
      });
    }
  }


  _commentDeleteHandler(evt) {
    evt.preventDefault();
    if (!evt.target.classList.contains(`film-details__comment-delete`)) {
      return;
    }
    this._currentDeleteButton = evt.target;
    this._currentDeleteButton.setAttribute(`disabled`, `disabled`);
    this._currentDeleteButton.textContent = `Deleting....`;
    this._currentDeleteButton.disabled = true;
    const commentId = evt.target.dataset.idType;
    this._api.deleteComment(commentId)
      .then(() => {
        this._commentModel.deleteComment(UserAction.DELETE_COMMENT, {id: commentId});
        this.updateElement();
      })
      .catch(()=>{
        const popup = this.getElement();
        popup.style.animation = `shake 2s`;

      })
      .finally(()=>{
        setTimeout(() => {
          this._currentDeleteButton.textContent = `Delete`;
          this._currentDeleteButton.disabled = false;
        }, 2);
      });
  }


  restoreHandlers() {
    this._setInnerHandlers();
    this.cardHandler(this._callback.click);
  }

}

