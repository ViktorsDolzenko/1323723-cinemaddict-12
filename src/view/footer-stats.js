import Abstract from "./abstract.js";
export default class FooterStats extends Abstract {
  constructor(film) {
    super();
    this._element = null;
    this._film = film;
  }

  getTemplate() {
    return (
      `<p> ${this._film.length} movies inside</p>`
    );
  }
}
