//actionCreators for submitting an order
import * as actionTypes from "./actionTypes";

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

//async action using a saga
export const purchaseBurger = (orderData, token) => {
  return {
    type: actionTypes.PURCHASE_BURGER_POST_REQUEST,
    orderData,
    token,
  };
};

//sync action from returned saga reponse
export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

//sync
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

//sync
export const purchaseBurgerFailure = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const fetchOrders = (token, userId) => {
  return {
    type: actionTypes.FETCH_ORDERS_INIT,
    token,
    userId,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};
