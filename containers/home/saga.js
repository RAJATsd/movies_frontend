import { put, takeLatest } from "redux-saga/effects";

import apiUrl from "@/utils/apiUrl";
import {
  fetchMovieListError,
  fetchMovieListStart,
  fetchMovieListSuccess,
  fetchMoreMoviesSuccess,
  fetchMoreMoviesError,
  fetchMoreMoviesStart,
  searchMovieStart,
  searchMovieSuccess,
  searchMovieError,
  searchMoreMoviesStart,
  searchMoreMoviesError,
  searchMoreMoviesSuccess,
  addChecklistAndLikeError,
  addChecklistAndLikeStart,
  addChecklistAndLikeSuccess,
  fetchChecklistAndLikeError,
  fetchChecklistAndLikeStart,
  fetchChecklistAndLikeSuccess,
  removeChecklistAndLikeError,
  removeChecklistAndLikeStart,
  removeChecklistAndLikeSuccess,
} from "./reducer";

function* fetchMovies(action) {
  try {
    const { sortBy, year, genre } = action.payload || {};
    const queryParams = new URLSearchParams();
    queryParams.append("sortBy", sortBy);
    queryParams.append("year", year);
    queryParams.append("genre", genre);
    const url = apiUrl("movies");
    const finalUrl = new URL(url);
    finalUrl.search = queryParams.toString();

    const response = yield fetch(finalUrl);
    const data = yield response.json();

    yield put(fetchMovieListSuccess(data));
  } catch (err) {
    yield put(fetchMovieListError(err));
  }
}

function* fetchMoreMovies(action) {
  try {
    const { page, sortBy, year, genre } = action.payload;
    const queryParams = new URLSearchParams();
    queryParams.append("page", page);
    queryParams.append("sortBy", sortBy);
    queryParams.append("year", year);
    queryParams.append("genre", genre);
    const url = apiUrl("movies");
    const finalUrl = new URL(url);
    finalUrl.search = queryParams.toString();

    const response = yield fetch(finalUrl);
    const data = yield response.json();

    yield put(fetchMoreMoviesSuccess(data));
  } catch (err) {
    yield put(fetchMoreMoviesError(err));
  }
}

function* searchMovie(action) {
  try {
    const url = apiUrl(`movies?query=${action.payload}`);

    const response = yield fetch(url);
    const data = yield response.json();

    yield put(searchMovieSuccess(data));
  } catch (err) {
    yield put(searchMovieError(err));
  }
}

function* fetchNextMovies(action) {
  try {
    const url = apiUrl(``);

    const response = yield fetch(url);
    const data = yield response.json();

    yield put(searchMoreMoviesSuccess(data));
  } catch (err) {
    yield put(searchMoreMoviesError(err));
  }
}

function* fetchChecklistAndLike() {
  try {
    const url = apiUrl(`watchlistandlike`);

    const response = yield fetch(url);
    const data = yield response.json();

    yield put(fetchChecklistAndLikeSuccess(data));
  } catch (err) {
    yield put(fetchChecklistAndLikeError(err));
  }
}

function* addChecklistAndLike(action) {
  try {
    const { movieId, entity } = action.payload;
    const url = apiUrl(`watchlistandlike/${movieId}/${entity}`);

    const response = yield fetch(url, { method: "POST" });
    const data = yield response.json();

    yield put(addChecklistAndLikeSuccess(data));
  } catch (err) {
    yield put(addChecklistAndLikeError(err));
  }
}

function* removeWatchlistAndLike(action) {
  try {
    const { movieId, entity } = action.payload;
    const url = apiUrl(`watchlistandlike/${movieId}/${entity}`);

    const response = yield fetch(url, { method: "DELETE" });
    const data = yield response.json();

    yield put(removeChecklistAndLikeSuccess(data));
  } catch (err) {
    yield put(removeChecklistAndLikeError(err));
  }
}

export default function* watchHome() {
  yield takeLatest(fetchMovieListStart.type, fetchMovies);
  yield takeLatest(fetchMoreMoviesStart.type, fetchMoreMovies);
  yield takeLatest(searchMovieStart.type, searchMovie);
  yield takeLatest(searchMoreMoviesStart.type, fetchNextMovies);
  yield takeLatest(fetchChecklistAndLikeStart.type, fetchChecklistAndLike);
  yield takeLatest(addChecklistAndLikeStart.type, addChecklistAndLike);
  yield takeLatest(removeChecklistAndLikeStart.type, removeWatchlistAndLike);
}
