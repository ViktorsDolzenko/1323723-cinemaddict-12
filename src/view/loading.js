import Abstract from "../view/abstract.js";

const createNofilmsTemplate = () => {
  return `<p class="films__no-films">
  Loading... </p>`;
};

export default class Loading extends Abstract {
  getTemplate() {
    return createNofilmsTemplate();
  }
}
