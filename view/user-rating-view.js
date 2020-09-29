import Abstract from "./abstract.js";
import {getUserStatus} from "../utils/user-profile.js";

const createProfileRatingTemplate = (userRating) => {
  return `<section class="header__profile profile">
  ${userRating > 0 ? `<p class="profile__rating">${getUserStatus(userRating)}</p>` : `` }
<img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;
};

export default class UserRatingView extends Abstract {

  constructor(userRating) {
    super();
    this._userRating = userRating;
  }

  getTemplate() {
    return (
      createProfileRatingTemplate(this._userRating)
    );
  }
}
