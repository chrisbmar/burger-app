import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const checkout = ({ history, match }) => {
  const ings = useSelector((state) => state.burgerBuilder.ingredients);
  const purchased = useSelector((state) => state.order.purchased);

  const checkoutCancelledHandler = () => {
    history.goBack();
  };

  const checkoutContinuedHandler = () => {
    history.replace("/checkout/contact-data");
  };

  let summary = <Redirect to="/" />;
  if (ings) {
    const purchasedRedirect = purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={ings}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        <Route path={match.url + "/contact-data"} component={ContactData} />
      </div>
    );
  }
  return summary;
};

export default checkout;
