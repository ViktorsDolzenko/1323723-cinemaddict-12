import {getRandomInt} from "../utils/common.js";

import {
  shuffle
} from "lodash";
const people = [`Lee Aaker`,
  `Willie Aames`,
  `Quinton Aaron`,
  `Victor Aaron`,
  `Abbott and Costello`,
  `Bruce Abbott`,
  `Bud Abbott`,
  `Christopher Abbott`,
  `Philip Abbott`,
  `Jake Abel`,
  `Walter Abel`,
  `Zachary Abel`,
  `F.Murray Abraham`,
  `Jon Abrahams`,
  `Omid Abtahi`,
  `Yousef Abu - Taleb`,
  `Kirk Acevedo`
];


const generateTitle = () => {
  const title = [`Terminator`, `Troy`, `Matrix`, `Back in Future`, `Oblivion`];

  return title[getRandomInt(0, title.length - 1)];

};

const generatePoster = () => {
  const images = [`/images/posters/made-for-each-other.png`, `/images/posters/popeye-meets-sinbad.png`, `/images/posters/sagebrush-trail.jpg`];
  const imagePath = images[getRandomInt(0, images.length - 1)];
  return imagePath;
};

const generateDescription = () => {

  const description = `orem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
  const splitDesctiption = description.split(`, `);
  return splitDesctiption[getRandomInt(0, splitDesctiption.length - 1)];
};

const generateScore = () => {
  return getRandomInt(1, 100) * 0.1;
};

const generateYear = () => {
  return getRandomInt(1960, 2005);
};

const generateGenre = () => {
  const genres = [`horror`, `comedy`, `romantic`, `drama`];
  return genres[getRandomInt(0, genres.length - 1)];
};

const generateDuration = () => {
  let hours = getRandomInt(1, 2);
  let minutes = getRandomInt(0, 59);
  if (minutes < 10) {
    minutes = `0` + minutes;
  }
  return hours + `h ` + minutes + `m`;
};

const generatePeople = (n) => {
  const randomPeople = shuffle(people);
  return randomPeople.slice(0, n);
};

export const generateFilm = () => {
  return {
    title: generateTitle(),
    poster: generatePoster(),
    description: generateDescription(),
    score: generateScore().toFixed(1),
    year: generateYear(),
    genre: generateGenre(),
    duration: generateDuration(),
    commentsCount: getRandomInt(1, 300),
    actors: generatePeople(3),
    writer: generatePeople(1),
    director: generatePeople(1),
  };
};
