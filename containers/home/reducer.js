import {
  checklistConverter,
  removeChecklistOrLike,
} from "@/utils/checklistConverter";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  movieList: {
    data: null,
    error: null,
    loading: false,
  },
  nextMovies: {
    data: null,
    error: null,
    loading: false,
  },
  searchMovie: {
    data: null,
    error: null,
    loading: false,
  },
  searchMoviesNext: {
    data: null,
    error: null,
    loading: false,
  },
  checklistAndLike: {
    data: null,
    error: null,
    loading: false,
  },
  addChecklistAndLike: {
    data: null,
    error: null,
    loading: false,
  },
  removeChecklistAndLike: {
    data: null,
    error: null,
    loading: false,
  },
};

const fetchMoviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    fetchMovieListStart(state) {
      state.movieList.loading = true;
    },
    fetchMovieListSuccess(state, action) {
      state.movieList.data = action.payload;
      state.movieList.error = null;
      state.movieList.loading = false;
    },
    fetchMovieListError(state, action) {
      state.movieList.data = null;
      state.movieList.error = action.payload;
      state.movieList.loading = false;
    },
    fetchMoreMoviesStart(state) {
      state.nextMovies.loading = true;
    },
    fetchMoreMoviesSuccess(state, action) {
      state.nextMovies.data = action.payload;
      state.nextMovies.error = null;
      state.nextMovies.loading = false;
      state.movieList.data = {
        ...action.payload,
        results: [...state.movieList.data.results, ...action.payload.results],
      };
    },
    fetchMoreMoviesError(state, action) {
      state.nextMovies.data = null;
      state.nextMovies.error = action.payload;
      state.nextMovies.loading = false;
    },
    searchMovieStart(state) {
      state.searchMovie.loading = true;
    },
    searchMovieSuccess(state, action) {
      state.searchMovie.data = action.payload;
      state.searchMovie.error = null;
      state.searchMovie.loading = false;
    },
    searchMovieError(state, action) {
      state.searchMovie.data = null;
      state.searchMovie.error = action.payload;
      state.searchMovie.loading = false;
    },
    searchMoreMoviesStart(state) {
      state.searchMoviesNext.loading = true;
    },
    searchMoreMoviesSuccess(state, action) {
      state.searchMoviesNext.data = action.payload;
      state.searchMoviesNext.error = null;
      state.searchMoviesNext.loading = false;
      state.searchMovie.data = {
        ...action.payload,
        results: [...state.searchMovie.data.results, ...action.payload.results],
      };
    },
    searchMoreMoviesError(state, action) {
      state.searchMoviesNext.data = null;
      state.searchMoviesNext.error = action.payload;
      state.searchMoviesNext.loading = false;
    },
    updateSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    fetchChecklistAndLikeStart(state) {
      state.checklistAndLike.loading = true;
    },
    fetchChecklistAndLikeSuccess(state, action) {
      state.checklistAndLike.data = checklistConverter(action.payload);
      state.checklistAndLike.error = null;
      state.checklistAndLike.loading = false;
    },
    fetchChecklistAndLikeError(state, action) {
      state.checklistAndLike.data = null;
      state.checklistAndLike.error = action.payload;
      state.checklistAndLike.loading = false;
    },
    addChecklistAndLikeStart(state) {
      state.addChecklistAndLike.loading = true;
    },
    addChecklistAndLikeSuccess(state, action) {
      state.checklistAndLike.data = checklistConverter(action.payload);
      state.addChecklistAndLike.data = action.payload;
      state.addChecklistAndLike.error = null;
      state.addChecklistAndLike.loading = false;
    },
    addChecklistAndLikeError(state, action) {
      state.addChecklistAndLike.data = null;
      state.addChecklistAndLike.error = action.payload;
      state.addChecklistAndLike.loading = false;
    },
    removeChecklistAndLikeStart(state) {
      state.removeChecklistAndLike.loading = true;
    },
    removeChecklistAndLikeSuccess(state, action) {
      state.checklistAndLike.data = removeChecklistOrLike(
        state.checklistAndLike.data,
        action.payload.entity,
        action.payload.movieId
      );
      state.removeChecklistAndLike.data = action.payload;
      state.removeChecklistAndLike.error = null;
      state.removeChecklistAndLike.loading = false;
    },
    removeChecklistAndLikeError(state, action) {
      state.removeChecklistAndLike.data = null;
      state.removeChecklistAndLike.error = action.payload;
      state.removeChecklistAndLike.loading = false;
    },
  },
});

export const {
  fetchMovieListStart,
  fetchMovieListError,
  fetchMovieListSuccess,
  fetchMoreMoviesError,
  fetchMoreMoviesStart,
  fetchMoreMoviesSuccess,
  searchMoreMoviesError,
  searchMoreMoviesStart,
  searchMoreMoviesSuccess,
  searchMovieError,
  searchMovieStart,
  searchMovieSuccess,
  updateSearchQuery,
  addChecklistAndLikeError,
  addChecklistAndLikeStart,
  addChecklistAndLikeSuccess,
  fetchChecklistAndLikeError,
  fetchChecklistAndLikeStart,
  fetchChecklistAndLikeSuccess,
  removeChecklistAndLikeError,
  removeChecklistAndLikeStart,
  removeChecklistAndLikeSuccess,
} = fetchMoviesSlice.actions;

export { initialState };

export default fetchMoviesSlice.reducer;
