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

const emojies = [
  `images/emoji/angry.png`,
  `images/emoji/puke.png`,
  `images/emoji/sleeping.png`,
  `images/emoji/smile.png`
];


const generateTitle = () => {
  const title = [`Terminator`, `Troy`, `Matrix`, `Back in Future`, `Oblivion`, `Haters`, `Pimp`, `Gladiator`, `Superman`];

  return title[getRandomInt(0, title.length - 1)];

};

const generatePoster = () => {
  const images = [`/images/posters/made-for-each-other.png`, `/images/posters/popeye-meets-sinbad.png`, `/images/posters/sagebrush-trail.jpg`, `/images/posters/santa-claus-conquers-the-martians.jpg`, `/images/posters/the-dance-of-life.jpg`, `/images/posters/the-great-flamarion.jpg`, `/images/posters/the-man-with-the-golden-arm.jpg`];
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
  const genres = [`Horror`, `Comedy`, `Romantic`, `Drama`, `Thriller`];
  const randomGenres = shuffle(genres).slice(0, 3);
  return randomGenres;
};


const generatePeople = (n) => {
  const randomPeople = shuffle(people);
  return randomPeople.slice(0, n);
};

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const getRandomBool = () => {
  const randomBool = Math.random() >= 0.5;
  return randomBool;
};


const generateCommentText = () => {
  const commentText = [
    `Interesting setting and a good cast`,
    `Booooooooooring`,
    `Very very old. Meh`,
    `Almost two hours? Seriously?`
  ];

  const randomIndex = getRandomInt(0, commentText.length - 1);

  return commentText[randomIndex];
};

export const generateCommentAuthor = () => {
  const authors = [
    `Tim Macoveev`,
    `John Doe`,
    `Matthew Norman`,
    `Caitlin Harmon`,
    `Jane Bond`,
    `Roger Harrell`
  ];

  const randomIndex = getRandomInt(0, authors.length - 1);

  return authors[randomIndex];
};

const generateCommentTime = () => {
  return parseInt(new Date().getTime(), 10);
};

const generateComment = () => {
  return {
    author: generateCommentAuthor(),
    time: generateCommentTime(),
    text: generateCommentText(),
    emoji: emojies[getRandomInt(0, emojies.length - 1)],
    emojiesList: emojies
  };
};

export const generateComments = () => {
  const comments = [];

  for (let i = 0; i < getRandomInt(0, 5); i++) {
    comments.push(generateComment());
  }
  return comments;
};

export const generateFilm = () => {
  return {
    id: generateId(),
    title: generateTitle(),
    poster: generatePoster(),
    description: generateDescription(),
    score: generateScore().toFixed(1),
    year: generateYear(),
    genre: generateGenre(),
    duration: getRandomInt(100, 180),
    commentsCount: getRandomInt(1, 300),
    actors: generatePeople(3),
    writer: generatePeople(1),
    director: generatePeople(1),
    isFavorite: getRandomBool(),
    isWatchlist: getRandomBool(),
    isWatched: getRandomBool(),
    comments: generateComments()
  };
};
