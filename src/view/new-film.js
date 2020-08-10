export const filmTemplate = (mock) => {

  const {
    title,
    poster,
    description,
    score,
    year,
    genre,
    duration,
    commentsCount,
  } = mock;
  return (`<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${score}</p>
  <p class="film-card__info">
    <span class="film-card__year">${year}</span>
    <span class="film-card__duration">${duration}</span>
    <span class="film-card__genre">${genre}</span>
  </p>
  <img src=${poster} alt="" class="film-card__poster">
  <p class="film-card__description">${description}</p>
  <a class="film-card__comments">${commentsCount} comments</a>
  <form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active">Mark as favorite</button>
  </form>
</article>`);
};
