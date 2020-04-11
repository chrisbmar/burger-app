import React, { useState, useEffect, useCallback } from "react";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";
import axios from "../../axios-orders";

const burgerBuilder = ({ history }) => {
  const [purchasing, setPurchasing] = useState(false);

  const ings = useSelector((state) => state.burgerBuilder.ingredients);
  const cost = useSelector((state) => state.burgerBuilder.totalPrice);
  const error = useSelector((state) => state.burgerBuilder.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();
  const onIngredientAdded = (name) => dispatch(actions.addIngredient(name));
  const onIngredientRemoved = (name) =>
    dispatch(actions.removeIngredient(name));
  const onInitIngredients = useCallback(
    () => dispatch(actions.initIngredients()),
    []
  );
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) =>
    dispatch(actions.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((elKey) => {
        return ingredients[elKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath("/checkout");
      history.push("./auth");
    }
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    history.push("/checkout");
  };

  const purchaseCancelledHandler = () => {
    setPurchasing(false);
  };

  const disabledInfo = {
    ...ings,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

  if (ings) {
    burger = (
      <Aux>
        <Burger ingredients={ings} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabledInfo={disabledInfo}
          purchaseable={updatePurchaseState(ings)}
          showSummary={purchaseHandler}
          price={cost}
          isAuth={isAuthenticated}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        ingredients={ings}
        price={cost}
        purchaseCancelled={purchaseCancelledHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelledHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

export default withErrorHandler(burgerBuilder, axios);
