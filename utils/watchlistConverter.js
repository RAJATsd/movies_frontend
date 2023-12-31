export const watchlistConverter = (data) => {
  if (!data) {
    return null;
  }

  const convertedData = {
    ...data,
    watchlist: data.watchlist.reduce((prev, curr) => {
      prev[curr] = 1;
      return prev;
    }, {}),
    like: data.like.reduce((prev, curr) => {
      prev[curr] = 1;
      return prev;
    }, {}),
  };

  return convertedData;
};

export const removeWatchlistOrLike = (data, entity, movieId) => {
  const newData = {
    ...data,
    [entity]: { ...data[entity], [movieId]: undefined },
  };

  return newData;
};
