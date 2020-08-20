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
const topRatedContainer = new TopRatedFilms().getElement().querySelector(`.films-list__container--top-rated`);
const topCommentedContainer = new TopCommentedFilms().getElement().querySelector(`.films-list__container--top-commented`);
const filmList = new FilmContainer().getElement().querySelector(`.films-list`);
export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._filmContainerComponent = new FilmContainer();
    this._topRatedFilmsComponent = new TopRatedFilms();
    this._topCommentedFilmsComponent = new TopCommentedFilms();
    this._filmDetailsComponent = new FilmDetails();
    this._showMoreButtonComponent = new ShowMoreButton();
    this._noDataComponent = new NoData();
    this._showMorefilms = this._showMorefilms.bind(this);
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();
    render(this._boardContainer, this._filmContainerComponent, RenderPosition.BEFOREEND);

    this._filmContainer();
    this._renderCards();
    this._showMoreFilmsHandler();
    this._topRatedFilms();
    this._topCommentedfilms();
  }

  _filmContainer() {
    render(pageMain, this._filmContainerComponent, RenderPosition.BEFOREEND);
  }

  _renderCards(film) {
    const filmComponent = new NewFilm(film);
    const DetailsComponent = new FilmDetails(film);


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
      render(topRatedContainer, element, RenderPosition.BEFOREEND);
    });
  }

  _topCommentedfilms() {
    this._boardFilms.sort((a, b) => b.score - a.score).slice(0, 2).forEach((element) => {
      render(topCommentedContainer, element, RenderPosition.BEFOREEND);
    });
  }


  _showMoreFilms() {
    let counter = 0;
    const addFilms = () => {
      if (this._boardFilms.length < 1) {
        render(filmList, this._noDataComponent, RenderPosition.BEFOREEND);

      } else {
        this._boardFilms.slice(counter, counter + 5).forEach((element) => {
          render(this._filmContainerComponent, element, RenderPosition.BEFOREEND);
        });
      }
      counter += 5;
      if (counter >= this._boardFilms.length) {
        this._showMoreButtonComponent.remove();
      }
    };
    return addFilms;
  }

  _showMoreFilmsHandler() {
    render(filmList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._showMorefilms);
  }

}
