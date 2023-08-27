import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";

import homeReducer from "@/containers/home/reducer";
import movieDetailsReducer from "@/containers/details/reducer";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { movies: homeReducer, movieDetails: movieDetailsReducer },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
