import
UserRatingView
  from "./view/user-rating.js";
import
FilterView
  from "./view/nav.js";
import
SortView
  from "./view/sort.js";

import
FooterStats
  from "./view/footer-stats.js";
import {
  generateFilm
} from "./mock/film-description.js";

import {
  filterCount
} from "./mock/filter-components.js";
import {
  render,
  RenderPosition,
} from "./utils/render.js";
import Board from "./presenter/board.js";

const NEW_FILM = 20;

export const filmMock = new Array(NEW_FILM).fill().map(generateFilm);
const filtersNumber = filterCount();

const pageHeader = document.querySelector(`.header`);

render(pageHeader, new UserRatingView(), RenderPosition.BEFOREEND);

const pageMain = document.querySelector(`.main`);


render(pageMain, new FilterView(filtersNumber), RenderPosition.AFTERBEGIN);

render(pageMain, new SortView(), RenderPosition.BEFOREEND);
const footerStats = document.querySelector(`.footer__statistics`);
render(footerStats, new FooterStats(filmMock), RenderPosition.BEFOREEND);
const boardPresenter = new Board(pageMain);
boardPresenter.init(filmMock);
