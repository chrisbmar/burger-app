//actionCreators for building a burger
import * as actionTypes from "./actionTypes";

//async action using a saga
export const initIngredients = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS,
  };
};

//sync action from returned saga reponse
export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

//sync action from returned saga reponse
export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

//sync action from returned saga reponse
export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

//sync action from returned saga reponse
export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};
