export const generateNavigationFilter = (cards) => {

  return {
    all: cards.length,
    watchlist: cards.filter((card) => card.isWatchlist).length,
    watched: cards.filter((card) => card.isWatched).length,
    favorites: cards.filter((card) => card.isFavorit).length,
  };
};
