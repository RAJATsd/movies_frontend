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
} = fetchMoviesSlice.actions;

export { initialState };

export default fetchMoviesSlice.reducer;
