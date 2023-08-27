import { createSelector } from "@reduxjs/toolkit";

import { initialState } from "./reducer";

const selectMovieState = (state) => state?.movies || initialState;

const makeSelectMoviesList = () =>
  createSelector(selectMovieState, (subState) => subState.movieList);

const makeSelectSearchedMovies = () =>
  createSelector(selectMovieState, (subState) => subState.searchMovie);

const makeSelectSearchQuery = () =>
  createSelector(selectMovieState, (subState) => subState.searchQuery);

export {
  makeSelectMoviesList,
  makeSelectSearchedMovies,
  makeSelectSearchQuery,
};
