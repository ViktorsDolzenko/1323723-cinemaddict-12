

export const filter = {
  all: (films) => films,
  watchlist: (films) => films.filter((film) => film.isWatchlist),
  history: (films) => films.filter((film) => film.isWatched),
  favorites: (films) => films.filter((film) => film.isFavorite),
};
