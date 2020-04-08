import { delay } from "redux-saga/effects";
import { put } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "axios";

export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(actions.logoutSuccess());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationInMilliseconds);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };

  //default URL for signup
  let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  const apiKey = "AIzaSyDDkQIk2feWHQyFd1RctxjqS8lDvg_zN4Q";

  //change URL to signin if parameter requestType === 'signin'
  if (action.requestType === "signin") {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  }
  try {
    const response = yield axios.post(`${url}${apiKey}`, authData);

    const expirationDate = yield new Date().getTime() +
      response.data.expiresIn * 1000;
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(actions.checkAuthTimeout(response.data.expiresIn * 1000));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (token) {
    const expirationDate = yield localStorage.getItem("expirationDate");
    if (expirationDate > new Date().getTime()) {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeout(expirationDate - new Date().getTime())
      );
    } else {
      yield put(actions.logout());
    }
  }
}
