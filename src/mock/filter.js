export const generateNavigationFilter = (cards) => {

  return {
    watchlist: cards.filter(function (card) {
      return card.isWatchlist;
    }).length,
    watched: cards.filter(function (card) {
      return card.isWatched;
    }).length,
    favorites: cards.filter(function (card) {
      return card.isFavorit;
    }).length,
  };
};
