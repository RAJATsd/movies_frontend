import { put, takeLatest } from "redux-saga/effects";

import apiUrl from "@/utils/apiUrl";
import {
  fetchMovieDetailsError,
  fetchMovieDetailsStart,
  fetchMovieDetailsSuccess,
} from "./reducer";

function* fetchMovieDetails(action) {
  try {
    const url = apiUrl(`movie/${action.payload}`);

    const response = yield fetch(url);
    const data = yield response.json();

    yield put(fetchMovieDetailsSuccess(data));
  } catch (err) {
    yield put(fetchMovieDetailsError(err));
  }
}

export default function* watchMovieDetails() {
  yield takeLatest(fetchMovieDetailsStart.type, fetchMovieDetails);
}
