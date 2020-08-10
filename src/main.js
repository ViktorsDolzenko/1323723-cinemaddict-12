import {
  userRatingTemplate
} from "./view/user-rating.js";
import {
  navigationTemplate
} from "./view/nav.js";
import {
  sortTemplate
} from "./view/sort.js";
import {
  filmContainerTemplate
} from "./view/film-container.js";
import {
  filmTemplate
} from "./view/new-film.js";

import {
  topRatedMoviesTemplate
} from "./view/toprated-container.js";
import {
  topCommentedMoviesTemplate
} from "./view/topcommented-container.js";
import {
  filmDetailsTemplate
} from "./view/film-details.js";

import {
  footerTemplate
} from "./view/footer-stats.js";
import {
  generateFilm
} from "./mock/film-description.js";

import {
  filterCount
} from "./mock/filter-components.js";
import {
  showMoreButtonTemplate
} from "./view/button.js";

const NEW_FILM = 20;
export const filmMock = new Array(NEW_FILM).fill().map(generateFilm);
const count = new Array(filterCount());

const render = (container, place, template) => {
  container.insertAdjacentHTML(template, place);
};

const pageHeader = document.querySelector(`.header`);

render(pageHeader, userRatingTemplate(), `beforeEnd`);

const pageMain = document.querySelector(`.main`);

render(pageMain, navigationTemplate(count[0]), `afterbegin`);


const navigationMenu = document.querySelector(`nav`);

render(navigationMenu, sortTemplate(), `afterend`);
const sortMenu = document.querySelector(`.sort`);

render(sortMenu, filmContainerTemplate(), `afterend`);

const filmContainer = document.querySelector(`.films-list__container`);


render(filmContainer, showMoreButtonTemplate(), `afterend`);
const films = document.querySelector(`.films`);
render(films, topRatedMoviesTemplate(), `beforeend`);

const topRatedContainer = document.querySelector(`.films-list__container--top-rated`);
filmMock.sort((a, b) => b.score - a.score).slice(0, 2).forEach((element) => {
  render(topRatedContainer, filmTemplate(element), `beforeEnd`);
});

const topCommentedContainer = document.querySelector(`.films-list--extra-rating`);
render(topCommentedContainer, topCommentedMoviesTemplate(), `afterend`);

const topCommentedfilms = document.querySelector(`.films-list__container--top-commented`);

filmMock.sort((a, b) => b.score - a.score).slice(0, 2).forEach((element) => {
  render(topCommentedfilms, filmTemplate(element), `beforeend`);
});

const footer = document.querySelector(`.footer`);
render(footer, filmDetailsTemplate(filmMock[0]), `afterend`);

const footerStats = document.querySelector(`.footer__statistics`);
render(footerStats, footerTemplate(), `beforeend`);

const showMoreFilms = () => {
  let counter = 0;
  const addFilms = () => {
    filmMock.slice(counter, counter + 5).forEach((element) => {
      render(filmContainer, filmTemplate(element), `beforeend`);
    });
    counter += 5;
    if (counter >= filmMock.length) {
      button.remove();
    }
  };
  return addFilms;
};
const showMore = showMoreFilms();
showMore();
const button = document.querySelector(`.films-list__show-more`);
button.addEventListener(`click`, showMore);
