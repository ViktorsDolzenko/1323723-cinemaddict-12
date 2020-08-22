import Abstract from "./abstract.js";
export default class FooterStats extends Abstract {
  constructor(filmMock) {
    super();
    this._element = null;
    this._filmMock = filmMock;
  }

  getTemplate() {
    return (
      `<p> ${this._filmMock.length} movies inside</p>`
    );
  }
}
