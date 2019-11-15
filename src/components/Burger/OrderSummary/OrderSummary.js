import React from 'react';

import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(elKey => {
            return (
                <li key={elKey}>
                    <span style={{textTransform: 'capitalize'}}>{elKey}</span>: {props.ingredients[elKey]}
                </li>);
    });
 
    return (
        <Aux>
            <h3>Your order</h3>
            <p>Delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
        </Aux>
    );
};

export default orderSummary;