import Abstract from "./abstract.js";

export default class Smart extends Abstract {
  constructor() {
    super();
    this._changeData = {};
  }

  _favoriteClickHandler() {
    this._changeData(
        Object.assign({},
            this._film, {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  _watchListClickHandler() {
    this._changeData(
        Object.assign({},
            this._film, {
              isWatchlist: !this._film.isWatchlist
            }
        )
    );
  }
  _watchedClickHandler() {
    this._changeData(
        Object.assign({},
            this._film, {
              isWatched: !this._film.isWatched
            }
        )
    );
  }
  updateData(film) {
    this._changeData(Object.assign({}, this._film, film));
  }
}
