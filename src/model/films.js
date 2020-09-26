import Observer from "../utils/observer.js";

export default class FilmsModel extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();
    this.notify(updateType);
  }

  getFilms() {
    return this._films;
  }


  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting Film`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];

    this.notify(updateType, update);
  }


  static adaptToClient(film) {

    const adaptedFilm = Object.assign(
        {},
        film,
        {
          id: film.id,
          actors: film.film_info.actors.join(`, `),
          age: film.film_info.age_rating,
          titleAlternative: film.film_info.alternative_title,
          description: film.film_info.description,
          director: film.film_info.director,
          genre: film.film_info.genre,
          poster: film.film_info.poster,
          year: new Date(film.film_info.release.date),
          country: film.film_info.release.release_country,
          duration: film.film_info.runtime,
          title: film.film_info.title,
          score: film.film_info.total_rating,
          writers: film.film_info.writers.join(`, `),
          isFavorite: film.user_details.favorite,
          isWatched: film.user_details.already_watched,
          isWatchlist: film.user_details.watchlist,
          comment: film.comments
        }
    );
    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;
    return adaptedFilm;
  }


  static adaptToServer(film) {
    const adaptedFilm =
        {
          [`film_info`]: {
            [`title`]: film.title,
            [`age_rating`]: film.age,
            [`alternative_title`]: film.titleAlternative,
            [`genre`]: film.genre,
            [`runtime`]: film.duration,
            [`total_rating`]: film.score,
            [`poster`]: film.poster,
            [`description`]: film.description,
            [`release`]: {
              [`date`]: film.year,
              [`release_country`]: film.country
            },
            [`director`]: film.director,
            [`actors`]: film.actors.split(`, `),
            [`writers`]: film.writers.split(`, `),
            [`inWatchlist`]: film.isWatchlist,
            [`isWatched`]: film.isWatched,
            [`isFavorite`]: film.isFavorite,
          },
          [`user_details`]: {
            [`watchlist`]: film.isWatchlist,
            [`already_watched`]: film.isWatched,
            [`favorite`]: film.isFavorite,
            [`watching_date`]: `2020-06-01T07:17:24.141Z`
          },
          [`comments`]: film.comment
        }
    ;
    return adaptedFilm;
  }


}
