import {
  getRandomInt
} from "./film-description.js";
export const filterCount = () => {
  return {
    watchlist: getRandomInt(1, 20),
    history: getRandomInt(1, 20),
    favorites: getRandomInt(1, 20),
  };
};
