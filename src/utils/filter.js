import {FilterTypes} from "../const.js";

export const filter = {
  [FilterTypes.ALL]: (films) => films.filter((film) => film),
  [FilterTypes.FAVORITES]: (films) => films.filter((film) => film.isFavorite),
  [FilterTypes.WATCHED]: (films) => films.filter((film) => film.isWatched),
  [FilterTypes.WATCHLIST]: (films) => films.filter((film) => film.isWatchlist)
};
