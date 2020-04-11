import React, { useEffect, useCallback } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

const orders = () => {
  const dispatch = useDispatch();
  const onFetchOrders = useCallback(
    (token, userId) => dispatch(actions.fetchOrders(token, userId)),
    []
  );

  const ordersState = useSelector((state) => state.order.orders);
  const loading = useSelector((state) => state.order.loading);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    onFetchOrders(token, userId);
  }, [onFetchOrders]);

  let orders = <Spinner />;

  if (!loading) {
    orders = ordersState.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={+order.price}
      />
    ));
  }
  return <div>{orders}</div>;
};

export default withErrorHandler(orders, axios);
