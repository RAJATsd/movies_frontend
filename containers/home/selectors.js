import { createSelector } from "@reduxjs/toolkit";

import { initialState } from "./reducer";

const selectMovieState = (state) => state?.movies || initialState;

const makeSelectMoviesList = () =>
  createSelector(selectMovieState, (subState) => subState.movieList);

const makeSelectSearchedMovies = () =>
  createSelector(selectMovieState, (subState) => subState.searchMovie);

const makeSelectSearchQuery = () =>
  createSelector(selectMovieState, (subState) => subState.searchQuery);

const makeSelectWatchlistAndLikes = () =>
  createSelector(selectMovieState, (subState) => subState.checklistAndLike);

const makeSelectAddWatchlistAndLikes = () =>
  createSelector(selectMovieState, (subState) => subState.addChecklistAndLike);

const makeSelectRemoveWatchlistAndLikes = () =>
  createSelector(
    selectMovieState,
    (subState) => subState.removeChecklistAndLike
  );

export {
  makeSelectMoviesList,
  makeSelectSearchedMovies,
  makeSelectSearchQuery,
  makeSelectWatchlistAndLikes,
  makeSelectAddWatchlistAndLikes,
  makeSelectRemoveWatchlistAndLikes,
};
