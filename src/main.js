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
  render,
  RenderPosition,
} from "./utils/render.js";
import Board from "./presenter/board.js";
import FilmsModel from "./model/films.js";
import Navigation from "./presenter/filter.js";
import CommentsModel from "./model/comment.js";
import {MenuItem} from "./const.js";
import Api from "./api.js";
import {UpdateType} from "./const.js";

const pageHeader = document.querySelector(`.header`);
const pageMain = document.querySelector(`.main`);
const AUTHORIZATION = `Basic er883jdzbdw`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

const api = new Api(END_POINT, AUTHORIZATION);


const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.STATISTICS:
      navigation.disableCurrentFilter();
      boardPresenter.destroy();
      statisticPresenter.init();
      break;
    default: {
      if (statisticPresenter.isInitActive()) {
        statisticPresenter.destroy();
      }
    }
  }
};


const filterModel = new FilterModel();
const filmModel = new FilmsModel();
const commentsModel = new CommentsModel();
const navigation = new Navigation(pageMain, filterModel, filmModel);
navigation.setStatsClickHandler(handleSiteMenuClick);


const statisticPresenter = new Statistic(pageMain, filmModel);

const boardPresenter = new Board(pageMain, filmModel, filterModel, commentsModel, api);
boardPresenter.init();

const footerStats = document.querySelector(`.footer__statistics`);


api.getFilms()
  .then((films) => {
    filmModel.setFilms(UpdateType.INIT, films);
    navigation.init();
    render(pageHeader, new UserRatingView(films.length), RenderPosition.BEFOREEND);
    render(footerStats, new FooterStats(filmModel.getFilms()), RenderPosition.BEFOREEND);
  })
  .catch(() => {
    filmModel.setFilms(UpdateType.INIT, []);
    navigation.init();
    render(footerStats, new FooterStats(filmModel.getFilms()), RenderPosition.BEFOREEND);
  });

