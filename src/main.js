import
UserRatingView
  from "./view/user-rating.js";

import FilterModel from "./model/filter.js";
import Statistic from "./presenter/statistic.js";
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
import {MenuItem} from "./const.js";

const NEW_FILM = 20;

export const filmMock = new Array(NEW_FILM).fill().map(generateFilm);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.STATISTICS:
      navigation.disableCurrentFilter();
      boardPresenter.destroy();
      statisticPresenter.init();
      break;
    default: { if (statisticPresenter.isInitActive()) {
      statisticPresenter.destroy();
    }
    }
  }
};
const pageHeader = document.querySelector(`.header`);
const pageMain = document.querySelector(`.main`);
render(pageHeader, new UserRatingView(), RenderPosition.BEFOREEND);
const filterModel = new FilterModel();
const filmModel = new FilmsModel();
filmModel.setFilms(filmMock);
const commentsModel = new CommentsModel();
const navigation = new Navigation(pageMain, filterModel, filmModel);
navigation.setStatsClickHandler(handleSiteMenuClick);
navigation.init();
const statisticPresenter = new Statistic(pageMain, filmModel);

const boardPresenter = new Board(pageMain, filmModel, filterModel, commentsModel);
boardPresenter.init();


const footerStats = document.querySelector(`.footer__statistics`);
render(footerStats, new FooterStats(filmMock), RenderPosition.BEFOREEND);

