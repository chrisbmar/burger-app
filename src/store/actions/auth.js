import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT,
  };
};

export const logoutSuccess = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationInMilliseconds) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationInMilliseconds,
  };
};

export const auth = (email, password, requestType) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    //default URL for signup
    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    const apiKey = "AIzaSyDDkQIk2feWHQyFd1RctxjqS8lDvg_zN4Q";

    //change URL to signin if parameter requestType === 'signin'
    if (requestType === "signin") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    }
    axios
      .post(`${url}${apiKey}`, authData)
      .then((response) => {
        const expirationDate =
          new Date().getTime() + response.data.expiresIn * 1000;
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn * 1000));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const expirationDate = localStorage.getItem("expirationDate");
      if (expirationDate > new Date().getTime()) {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout(expirationDate - new Date().getTime()));
      } else {
        dispatch(logout());
      }
    }
  };
};
