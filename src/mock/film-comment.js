import {getRandomInt} from "../utils/common.js";
const generateCommentText = () => {
  const comment = [`Must See`, `Amazing`, `10/10`, `unwatchable trash`, `Not bad`];
  return comment[getRandomInt(0, comment.length - 1)];
};

const generateAuthor = () => {
  const author = [`Arthur`, `Madman`, `Pillow`, `Trash`, `Clown`];
  return author[getRandomInt(0, author.length - 1)];
};

export const generateComment = () => {
  return {
    text: generateCommentText(),
    author: generateAuthor(),
  };
};
