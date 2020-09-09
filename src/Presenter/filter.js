import {render, replace, remove} from "../utils.js";
import {filter} from "../filter.js";
import {FilterType, UpdateType} from "../const.js";
import Navigation from '../view/navigation.js';
import StatsPresenter from './stats.js';


export default class Filter {
  constructor(siteMenuContainer, filterModel, filmsModel, filmsPresenter) {
    this._siteMenuContainer = siteMenuContainer;
    this._statsPresenter = null;
    this._filmsPresenter = filmsPresenter;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._currentFilter = null;

    this._siteMenuComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleStatsClick = this._handleStatsClick.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();
    const filters = this._getFilters();
    const prevSiteMenuComponent = this._siteMenuComponent;

    this._siteMenuComponent = new Navigation(filters, this._currentFilter);
    this._siteMenuComponent.setFilterClickHandler(this._handleFilterTypeChange);
    this._siteMenuComponent.setStatsClickHandler(this._handleStatsClick);

    if (prevSiteMenuComponent === null) {
      render(this._siteMenuContainer, this._siteMenuComponent);
      return;
    }

    replace(prevSiteMenuComponent, this._siteMenuComponent);
    remove(prevSiteMenuComponent);
  }

  _handleStatsClick() {
    if (!this._filmsPresenter.isDestroy) {
      this._statsPresenter = new StatsPresenter(this._siteMenuContainer, this._filmsModel);
      this._replaceFilmsToStats();
    }
  }

  _handleModelEvent() {
    this.init();
  }

  _replaceFilmsToStats() {
    this._filmsPresenter.destroy();
    this._statsPresenter.init();
  }

  _replaceStatsToFilms() {
    if (this._filmsPresenter.isDestroy) {
      this._statsPresenter.destroy();
      this._filmsPresenter.init();
    }
    this._filmsPresenter.isDestroy = false;
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType && !this._filmsPresenter.isDestroy) {
      return;
    }

    this._replaceStatsToFilms();

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();

    return [
      {
        type: FilterType.ALL,
        name: `All`,
        count: filter[FilterType.ALL](films).length
      },
      {
        type: FilterType.WATCHLIST,
        name: `WatchList`,
        count: filter[FilterType.WATCHLIST](films).length
      },
      {
        type: FilterType.HISTORY,
        name: `History`,
        count: filter[FilterType.HISTORY](films).length
      },
      {
        type: FilterType.FAVORITES,
        name: `Favorites`,
        count: filter[FilterType.FAVORITES](films).length
      },
    ];
  }
}
