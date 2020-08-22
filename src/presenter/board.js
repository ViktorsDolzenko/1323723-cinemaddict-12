import
FilmContainer
  from "../view/film-container.js";
import NewFilm
  from "../view/new-film.js";
import
TopRatedFilms
  from "../view/toprated-container.js";
import TopCommentedFilms
  from "../view/topcommented-container.js";
import FilmDetails
  from "../view/film-details.js";

import
ShowMoreButton
  from "../view/button.js";
import NoData from "../view/no-data.js";
import {
  render,
  RenderPosition,
  showPopup,
  closePopup
} from "../utils/render.js";


const pageMain = document.querySelector(`.main`);

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._filmContainerComponent = new FilmContainer();
    this._topRatedComponent = new TopRatedFilms();
    this._topCommentedComponent = new TopCommentedFilms();
    this._showMoreButtonComponent = new ShowMoreButton();
    this._noDataComponent = new NoData();
    this._onClickShowMoreFilms = this._showMoreFilms().bind(this);
    this._filmList = this._filmContainerComponent.getElement().querySelector(`.films-list`);
    this._filmListContainer = this._filmContainerComponent.getElement().querySelector(`.films-list__container`);
    this._topRatedContainer = this._topRatedComponent.getElement().querySelector(`.films-list__container--top-rated`);
    this._topCommentedContainer = this._topCommentedComponent.getElement().querySelector(`.films-list__container--top-commented`);
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();
    render(pageMain, this._filmContainerComponent, RenderPosition.BEFOREEND);
    render(this._filmContainerComponent, this._topRatedComponent, RenderPosition.BEFOREEND);
    render(this._filmContainerComponent, this._topCommentedComponent, RenderPosition.BEFOREEND);
    this._topRatedFilms();
    this._topCommentedfilms();
    this._onClickShowMoreFilms();
    this._showMoreFilmsHandler();
  }


  _renderCard(filmContainer, film) {
    const filmComponent = new NewFilm(film);
    const DetailsComponent = new FilmDetails(film);
    render(filmContainer, filmComponent, RenderPosition.BEFOREEND);

    const openDetails = () => {
      showPopup(DetailsComponent);
    };

    const closeDetails = () => {
      closePopup(DetailsComponent);
    };
    const closeDetailsKey = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        closePopup(DetailsComponent);
        document.removeEventListener(`keydown`, closeDetailsKey);
      }
    };
    filmComponent.openPopupHandler(() => {
      openDetails();
      document.addEventListener(`keydown`, closeDetailsKey);
    });

    DetailsComponent.closePopupHandler(() => {
      closeDetails();
      document.removeEventListener(`keydown`, closeDetailsKey);
    });
  }

  _topRatedFilms() {
    this._boardFilms.sort((a, b) => b.score - a.score).slice(0, 2).forEach((element) => {
      this._renderCard(this._topRatedContainer, element);
    });
  }

  _topCommentedfilms() {
    this._boardFilms.sort((a, b) => b.score - a.score).slice(0, 2).forEach((element) => {
      this._renderCard(this._topCommentedContainer, element);
    });
  }


  _showMoreFilms() {
    let counter = 0;
    const addFilms = () => {
      if (this._boardFilms.length < 1) {
        render(this._filmListContainer, this._noDataComponent, RenderPosition.BEFOREEND);

      } else {
        this._boardFilms.slice(counter, counter + 5).forEach((element) => {
          this._renderCard(this._filmListContainer, element);
        });
      }
      counter += 5;
      if (counter >= this._boardFilms.length) {
        this._showMoreButtonComponent.getElement().remove();
      }
    };
    return addFilms;
  }

  _showMoreFilmsHandler() {
    render(this._filmList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._onClickShowMoreFilms);
  }

}
