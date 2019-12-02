import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: null
    }

    componentDidMount () {
    //     axios.get('https://burger-builder94.firebaseio.com/ingredients.json')
    //         .then(response => {
    //             this.setState({ingredients: response.data});
    //         })
    //         .catch(error => this.setState({error: true}));
    // }

    // updatePurchaseState(ingredients) {
    //     const sum = Object.keys(ingredients)
    //         .map(elKey => {
    //             return ingredients[elKey]
    //         })
    //         .reduce((sum, el) => {
    //             return sum + el;
    //         }, 0);
    //     this.setState({purchaseable: sum > 0});
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    purchaseCancelledHandler = () => {
        this.setState({purchasing: false});
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabledInfo={disabledInfo}
                        purchaseable={this.state.purchaseable}
                        showSummary={this.purchaseHandler}
                        price={this.props.cost}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.cost}
                purchaseCancelled={this.purchaseCancelledHandler}
                purchaseContinued={this.purchaseContinueHandler}/>;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

       return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelledHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
       ); 
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        cost: state.totalPrice
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (name) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: name}),
        onIngredientRemoved: (name) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: name})
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));