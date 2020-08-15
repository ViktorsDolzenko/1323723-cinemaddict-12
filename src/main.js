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
FilmContainer
  from "./view/film-container.js";
import NewFilm
  from "./view/new-film.js";
import
TopRatedFilms
  from "./view/toprated-container.js";
import TopCommentedFilms
  from "./view/topcommented-container.js";
import FilmDetails
  from "./view/film-details.js";

import
FooterStats
  from "./view/footer-stats.js";
import {
  generateFilm
} from "./mock/film-description.js";

import {
  filterCount
} from "./mock/filter-components.js";
import
ShowMoreButton
  from "./view/button.js";

import {
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

render(pageMain, new SortView().getElement(), RenderPosition.BEFOREEND);
const filmContainerView = new FilmContainer().getElement();
render(pageMain, filmContainerView, RenderPosition.BEFOREEND);
const footer = document.querySelector(`.footer`);

const renderCard = (filmList, film) => {
  const filmComponent = new NewFilm(film).getElement();
  const DetailsComponent = new FilmDetails(film).getElement();
  render(filmList, filmComponent, RenderPosition.BEFOREEND);

  const openPopup = filmComponent.querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`);

  const closePopup = DetailsComponent.querySelector(`.film-details__close-btn`);

  const openDetails = () => {
    footer.appendChild(DetailsComponent);
  };

  const closeDetails = () => {
    footer.removeChild(DetailsComponent);
  };

  openPopup.forEach((element) => {
    element.addEventListener(`click`, openDetails);
  });

  closePopup.addEventListener(`click`, closeDetails);
};

const filmContainer = filmContainerView.querySelector(`.films-list__container`);
const topRatedFilmsView = new TopRatedFilms().getElement();
render(filmContainerView, topRatedFilmsView, RenderPosition.BEFOREEND);
const topRatedContainer = topRatedFilmsView.querySelector(`.films-list__container--top-rated`);
filmMock.sort((a, b) => b.score - a.score).slice(0, 2).forEach((element) => {
  renderCard(topRatedContainer, element);
});
const topCommentedView = new TopCommentedFilms().getElement();
render(filmContainerView, topCommentedView, RenderPosition.BEFOREEND);

const topCommentedfilms = topCommentedView.querySelector(`.films-list__container--top-commented`);

filmMock.sort((a, b) => b.score - a.score).slice(0, 2).forEach((element) => {
  renderCard(topCommentedfilms, element);
});

const footerStats = document.querySelector(`.footer__statistics`);
render(footerStats, new FooterStats(filmMock).getElement(), RenderPosition.BEFOREEND);
const showMoreFilms = () => {
  let counter = 0;
  const addFilms = () => {
    filmMock.slice(counter, counter + 5).forEach((element) => {
      renderCard(filmContainer, element);
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
const filmListContainer = filmContainerView.querySelector(`.films-list`);
const button = new ShowMoreButton().getElement();
button.addEventListener(`click`, showMore);
render(filmListContainer, button, RenderPosition.BEFOREEND);
