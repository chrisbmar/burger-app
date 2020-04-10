import React from "react";

import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = ({
  ingredients,
  price,
  purchaseCancelled,
  purchaseContinued,
}) => {
  const ingredientSummary = Object.keys(ingredients).map((elKey) => {
    return (
      <li key={elKey}>
        <span style={{ textTransform: "capitalize" }}>{elKey}</span>:{" "}
        {ingredients[elKey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your order</h3>
      <p>Delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: €{price.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={purchaseContinued}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
