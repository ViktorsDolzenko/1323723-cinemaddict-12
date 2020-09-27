
import Observer from "../utils/observer.js";

export default class CommentsModel extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  getComments() {
    return this._comments;
  }

  addComment(updateType, update) {
    this._comments = [
      ...this._comments,
      update
    ];

    this.notify(updateType, update);
  }

  deleteComment(UserAction, update) {
    const index = this._comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting comment`);
    }

    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1)
    ];

    this.notify(UserAction);
  }

  static adaptToClient(comment) {
    const adaptedComment = Object.assign(
        {},
        comment,
        {
          text: comment.comment,
          time: comment.date,
          emoji: comment.emotion,
        });

    delete adaptedComment.emoji;
    delete adaptedComment.text;
    delete adaptedComment.time;

    return adaptedComment;
  }

  static adaptToServer(comment) {
    let date = new Date();
    const adaptedComment = Object.assign(
        {},
        comment, {
          "comment": comment.text,
          "date": date.toISOString(comment.time),
          "emotion": comment.emoji,
        }
    );
    delete adaptedComment.emoji;
    delete adaptedComment.text;
    delete adaptedComment.time;
    return adaptedComment;
  }

}
