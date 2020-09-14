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
import CommentsModel from "./model/comment.js";
import TopRatedFilms
  from "./view/toprated-container.js";
const NEW_FILM = 20;
export const filmMock = new Array(NEW_FILM).fill().map(generateFilm);

const pageHeader = document.querySelector(`.header`);
const pageMain = document.querySelector(`.main`);
render(pageHeader, new UserRatingView(), RenderPosition.BEFOREEND);
const filterModel = new FilterModel();
const filmModel = new FilmsModel();
filmModel.setFilms(filmMock);
const commentsModel = new CommentsModel();
const navigation = new Navigation(pageMain, filterModel, filmModel);
navigation.init();
const boardPresenter = new Board(pageMain, filmModel, filterModel, commentsModel);
const topRated = new TopRatedFilms().getElement().querySelector(`.films-list__container--top-rated`);
const boardPresenterTopRated = new Board(topRated, filmModel, filterModel, commentsModel);
boardPresenter.init();
boardPresenterTopRated._topRatedFilms();

const footerStats = document.querySelector(`.footer__statistics`);
render(footerStats, new FooterStats(filmMock), RenderPosition.BEFOREEND);

