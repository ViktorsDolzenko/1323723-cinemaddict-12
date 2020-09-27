import Abstract from "./abstract.js";
export default class TopCommentedFilms extends Abstract {

  getTemplate() {
    return (`<section class="films-list--extra films-list--extra-commented">
<h2 class="films-list__title">Top commented</h2>
<div class="films-list__container films-list__container--top-commented">
</div>
</section>`);
  }
}
