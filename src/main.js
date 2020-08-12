import
UserRatingView
  from "./view/user-rating.js";
import
FilterView
  from "./view/nav.js";
import
SortView
  from "./view/sort.js";
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

import {
  renderTemplate,
  render,
  RenderPosition
} from "./util.js";

const NEW_FILM = 20;
export const filmMock = new Array(NEW_FILM).fill().map(generateFilm);
const filtersNumber = filterCount();

const pageHeader = document.querySelector(`.header`);

render(pageHeader, new UserRatingView().getElement(), RenderPosition.BEFOREEND);

const pageMain = document.querySelector(`.main`);

render(pageMain, new FilterView(filtersNumber).getElement(), RenderPosition.AFTERBEGIN);

const navigationMenu = document.querySelector(`nav`);

render(navigationMenu, new SortView().getElement(), RenderPosition.AFTEREND);
const sortMenu = document.querySelector(`.sort`);

renderTemplate(sortMenu, filmContainerTemplate(), `afterend`);

const filmContainer = document.querySelector(`.films-list__container`);


renderTemplate(filmContainer, showMoreButtonTemplate(), `afterend`);
const films = document.querySelector(`.films`);
renderTemplate(films, topRatedMoviesTemplate(), `beforeend`);

const topRatedContainer = document.querySelector(`.films-list__container--top-rated`);
filmMock.sort((a, b) => b.score - a.score).slice(0, 2).forEach((element) => {
  renderTemplate(topRatedContainer, filmTemplate(element), `beforeEnd`);
});

const topCommentedContainer = document.querySelector(`.films-list--extra-rating`);
renderTemplate(topCommentedContainer, topCommentedMoviesTemplate(), `afterend`);

const topCommentedfilms = document.querySelector(`.films-list__container--top-commented`);

filmMock.sort((a, b) => b.score - a.score).slice(0, 2).forEach((element) => {
  renderTemplate(topCommentedfilms, filmTemplate(element), `beforeend`);
});

const footer = document.querySelector(`.footer`);
renderTemplate(footer, filmDetailsTemplate(filmMock[0]), `afterend`);

const footerStats = document.querySelector(`.footer__statistics`);
renderTemplate(footerStats, footerTemplate(filmMock), `beforeend`);

const showMoreFilms = () => {
  let counter = 0;
  const addFilms = () => {
    filmMock.slice(counter, counter + 5).forEach((element) => {
      renderTemplate(filmContainer, filmTemplate(element), `beforeend`);
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
