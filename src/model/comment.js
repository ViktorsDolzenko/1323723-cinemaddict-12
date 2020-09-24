
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

  deleteComment(updateType, update) {
    const index = this._comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting comment`);
    }

    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1)
    ];

    this.notify(updateType);
  }

  static adaptToClient(comment) {

    const adaptedComment = Object.assign(
        {},
        comment,
        {
          id: comment.id,
          comment: comment.comment,
          author: comment.author,
          emotion: comment.emotion,
          date: comment.date
        }
    );
    return adaptedComment;
  }

  static adaptToServer(comment) {
    const adaptedComment =
        {
          [`id`]: comment.id,
          [`comment`]: comment.comment,
          [`author`]: comment.author,
          [`emotion`]: comment.emotion,
          [`date`]: comment.date,
        };


    return adaptedComment;
  }

}
