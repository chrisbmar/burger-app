import { takeEvery, all } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga,
} from "./auth";

import { initIngredientsSaga } from "./burgerBuilder";

import { purchaseBurgerSaga, fetchOrdersSaga } from "./order";

const authSagas = [
  takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
  takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
  takeEvery(actionTypes.AUTH_USER, authUserSaga),
  takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
];

const burgerBuilderSagas = [
  takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga),
];

const orderSagas = [
  takeEvery(actionTypes.PURCHASE_BURGER_POST_REQUEST, purchaseBurgerSaga),
  takeEvery(actionTypes.FETCH_ORDERS_INIT, fetchOrdersSaga),
];

export default function* rootSaga() {
  yield all([...authSagas, ...burgerBuilderSagas, ...orderSagas]);
}
