import
UserRatingView
  from "./view/user-rating.js";

import FilterModel from "./model/filter.js";

import "./model/films.js";
import
FooterStats
  from "./view/footer-stats.js";
import {
  generateFilm
} from "./mock/film-description.js";

import {
  render,
  RenderPosition,
} from "./utils/render.js";
import Board from "./presenter/board.js";
import FilmsModel from "./model/films.js";
import Navigation from "./presenter/filter.js";

const NEW_FILM = 20;
export const filmMock = new Array(NEW_FILM).fill().map(generateFilm);

const pageHeader = document.querySelector(`.header`);
const pageMain = document.querySelector(`.main`);
render(pageHeader, new UserRatingView(), RenderPosition.BEFOREEND);
const filterModel = new FilterModel();
const filmModel = new FilmsModel();
filmModel.setFilms(filmMock);
const boardPresenter = new Board(pageMain, filmModel, filterModel);

const navigation = new Navigation(pageMain, filterModel, filmModel, boardPresenter);

boardPresenter.init();
navigation.init();


const footerStats = document.querySelector(`.footer__statistics`);
render(footerStats, new FooterStats(filmMock), RenderPosition.BEFOREEND);

