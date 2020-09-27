import Abstract from "./abstract.js";
export default class TopRatedFilms extends Abstract {

  getTemplate() {
    return (
      `<section class="films-list--extra films-list--extra-rating">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container films-list__container--top-rated">
      </div>
      </section>`);
  }
}
