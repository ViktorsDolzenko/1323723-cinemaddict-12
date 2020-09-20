const WatchCountBound = {
  NONE: 0,
  NOVICE: 1,
  FAN: 11,
  MOVIE_BUFF: 20,
};

export const getUserStatus = (watchedCount) => {
  let profileRating = null;
  switch (true) {
    case watchedCount >= WatchCountBound.NOVICE && watchedCount < WatchCountBound.FAN:
      profileRating = `Novice`;
      break;
    case watchedCount >= WatchCountBound.FAN && watchedCount < WatchCountBound.MOVIE_BUFF:
      profileRating = `Fan`;
      break;
    case watchedCount >= WatchCountBound.MOVIE_BUFF:
      profileRating = `Movie Buff`;
      break;
    case watchedCount === WatchCountBound.NONE:
      profileRating = ``;
      break;
  }
  return profileRating;
};
