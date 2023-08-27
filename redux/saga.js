import { all, fork } from "redux-saga/effects";

import watchHome from "@/containers/home/saga";
import watchMovieDetails from "@/containers/details/saga";

const rootSaga = function* () {
  yield all([fork(watchHome), fork(watchMovieDetails)]);
};

export default rootSaga;
