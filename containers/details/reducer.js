import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieInfo: {
    data: null,
    error: null,
    loading: false,
  },
};

const fetchMoviesDetailsSlice = createSlice({
  name: "movieDetails",
  initialState,
  reducers: {
    fetchMovieDetailsStart(state) {
      state.movieInfo.loading = true;
    },
    fetchMovieDetailsSuccess(state, action) {
      state.movieInfo.data = action.payload;
      state.movieInfo.error = null;
      state.movieInfo.loading = false;
    },
    fetchMovieDetailsError(state, action) {
      state.movieInfo.data = null;
      state.movieInfo.error = action.payload;
      state.movieInfo.loading = false;
    },
  },
});

export const {
  fetchMovieDetailsError,
  fetchMovieDetailsStart,
  fetchMovieDetailsSuccess,
} = fetchMoviesDetailsSlice.actions;

export { initialState };

export default fetchMoviesDetailsSlice.reducer;
