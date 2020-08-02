
const NEW_FILM = 5;
import {userRatingTemplate} from "./view/user-rating.js";
import {navigationTemplate} from "./view/nav.js";
import {sortTemplate} from "./view/sort.js";
import {filmContainerTemplate} from "./view/film-container.js";
import {filmTemplate} from "./view/new-film.js";
import {showMoreButtonTemplate} from "./view/button.js";
import {topRatedMoviesTemplate} from "./view/toprated-container.js";
import {topCommentedMoviesTemplate} from "./view/topcommented-container.js";


const render = (container, place, template) => {
  container.insertAdjacentHTML(template, place);
};

const pageHeader = document.querySelector(`.header`);

render(pageHeader, userRatingTemplate(), `beforeEnd`);

const pageMain = document.querySelector(`.main`);

render(pageMain, navigationTemplate(), `afterbegin`);

const navigationMenu = document.querySelector(`nav`);

render(navigationMenu, sortTemplate(), `afterend`);
const sortMenu = document.querySelector(`.sort`);

render(sortMenu, filmContainerTemplate(), `afterend`);

const filmContainer = document.querySelector(`.films-list__container`);


for (let i = 0; i < NEW_FILM; i++) {
  render(filmContainer, filmTemplate(), `beforeend`);
}

render(filmContainer, showMoreButtonTemplate(), `afterend`);
const films = document.querySelector(`.films`);
render(films, topRatedMoviesTemplate(), `beforeend`);

const topRatedContainer = document.querySelector(`.films-list__container--top-rated`);
for (let i = 0; i < 2; i++) {
  render(topRatedContainer, filmTemplate(), `beforeEnd`);
}

const topCommentedContainer = document.querySelector(`.films-list--extra-rating`);
render(topCommentedContainer, topCommentedMoviesTemplate(), `afterend`);

const topCommentedfilms = document.querySelector(`.films-list__container--top-commented`);

for (let i = 0; i < 2; i++) {
  render(topCommentedfilms, filmTemplate(), `beforeend`);
}
