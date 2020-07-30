const NEW_FILM = 5;
const userRatingTemplate = () => {
  return (
    `<section class="header__profile profile">
<p class="profile__rating">Movie Buff</p>
<img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`
  );
};

const navigationTemplate = () => {
  return (
    `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`
  );
};

const sortTemplate = () => {
  return (
    `<ul class="sort">
<li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
<li><a href="#" class="sort__button">Sort by date</a></li>
<li><a href="#" class="sort__button">Sort by rating</a></li>
</ul>`);
};

const filmContainerTemplate = () => {
  return (`<section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container">
    </div>
  </section>`);
};

const filmTemplate = () => {
  return (`<article class="film-card">
  <h3 class="film-card__title">Santa Claus Conquers the Martians</h3>
  <p class="film-card__rating">2.3</p>
  <p class="film-card__info">
    <span class="film-card__year">1964</span>
    <span class="film-card__duration">1h 21m</span>
    <span class="film-card__genre">Comedy</span>
  </p>
  <img src="./images/posters/santa-claus-conquers-the-martians.jpg" alt="" class="film-card__poster">
  <p class="film-card__description">The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…</p>
  <a class="film-card__comments">465 comments</a>
  <form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active">Mark as favorite</button>
  </form>
</article>`);
};

const showMoreButtonTemplate = () => {
  return (`<button class="films-list__show-more">Show more</button>`);
};

const topRatedMoviesTemplate = () => {
  return (`<section class="films-list--extra films-list--extra-rating">
<h2 class="films-list__title">Top rated</h2>
<div class="films-list__container films-list__container--top-rated">
</div>
</section>`);
};

const topCommentedMoviesTemplate = () => {
  return (`<section class="films-list--extra films-list--extra-commented">
<h2 class="films-list__title">Top commented</h2>
<div class="films-list__container films-list__container--top-commented">
</div>
</section>`);
};

const render = (container, place, template) => {
  container.insertAdjacentHTML(template, place);
};

const pageHeader = document.querySelector(`.header`);

render(pageHeader, userRatingTemplate(), `beforeEnd`);

const pageMain = document.querySelector(`.main`)

render(pageMain, navigationTemplate(), `afterbegin`);

const navigationMenu = document.querySelector(`nav`);

render(navigationMenu, sortTemplate(), `afterend`);
const sortMenu = document.querySelector(`.sort`);

render(sortMenu, filmContainerTemplate(), `afterend`);

const filmContainer = document.querySelector(`.films-list__container`);


for (let i = 0; i < NEW_FILM; i++) {
  render(filmContainer, filmTemplate(), `beforeend`);
};

render(filmContainer, showMoreButtonTemplate(), `afterend`);
const showMoreButton = document.querySelector(`.films-list__show-more`)
const films = document.querySelector(`.films`)
render(films, topRatedMoviesTemplate(), `beforeend`);

const topRatedContainer = document.querySelector(`.films-list__container--top-rated`);
for (let i = 0; i < 2; i++) {
  render(topRatedContainer, filmTemplate(), `beforeEnd`);
};

const topCommentedContainer = document.querySelector(`.films-list--extra-rating`);
render(topCommentedContainer, topCommentedMoviesTemplate(), `afterend`);

const topCommentedfilms = document.querySelector(`.films-list__container--top-commented`);

for (let i = 0; i < 2; i++) {
  render(topCommentedfilms, filmTemplate(), `beforeend`);
};
