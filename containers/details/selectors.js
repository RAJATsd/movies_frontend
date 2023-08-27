import { createSelector } from "@reduxjs/toolkit";

import { initialState } from "./reducer";

const selectMovieState = (state) => state?.movieDetails || initialState;

const makeSelectMovieDetails = () =>
  createSelector(selectMovieState, (subState) => subState.movieInfo);

export { makeSelectMovieDetails };
