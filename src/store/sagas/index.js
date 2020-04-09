import { takeEvery, all } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga,
} from "./auth";

import { initIngredientsSaga } from "./burgerBuilder";

const authSagas = [
  takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
  takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
  takeEvery(actionTypes.AUTH_USER, authUserSaga),
  takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
];

const burgerBuilderSagas = [
  takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga),
];

export default function* rootSaga() {
  yield all([...authSagas, ...burgerBuilderSagas]);
}
