import { Action, createReducer, on } from '@ngrx/store';

import { initialUserMealsState, UserMealsState } from './user-meals.store';
import * as UserMealsActions from './user-meals.actions';
import { UserMeal } from '../../shared/models/userMeal.model';

const reducer = createReducer(
  initialUserMealsState,

  on(UserMealsActions.getUserMeals, (state) => {
    console.log('GET_USER_MEALS action being handled');
    return { ...state, loading: true };
  }),

  on(UserMealsActions.getUserMealsSuccess, (state, { userMeals }) => {
    console.log('GET_USER_MEALS action being handled');
    return { ...state, data: [...userMeals], loading: false, loaded: true };
  }),

  on(UserMealsActions.getUserMealsError, (state, { error }) => {
    console.log('GET_USER_MEALS_ERROR action being handled');
    return { ...state, loading: false, loaded: false, error: error };
  }),

  on(UserMealsActions.addUserMeal, (state) => {
    console.log('ADD_USER_MEAL action being handled');
    return { ...state, loading: true };
  }),

  on(UserMealsActions.addUserMealSuccess, (state, { userMeal }) => {
    console.log('ADD_USER_MEAL action being handled');
    return {
      ...state,
      data: [...state.data, userMeal],
      loading: false,
      loaded: true,
    };
  }),

  on(UserMealsActions.addUserMealError, (state, { error }) => {
    console.log('ADD_USER_MEAL_ERROR action being handled');
    return { ...state, loading: false, loaded: false, error: error };
  }),

  on(UserMealsActions.editUserMeal, (state) => {
    console.log('EDIT_USER_MEAL action being handled');
    return { ...state, loading: true };
  }),

  on(UserMealsActions.editUserMealSuccess, (state, { editUserMeal }) => {
    console.log('EDIT_USER_MEAL action being handled');
    const data = [...state.data].map((userMeal: UserMeal) =>
      userMeal.id === editUserMeal.id ? editUserMeal : userMeal
    );
    return {
      ...state,
      data: [...data],
      loading: false,
      loaded: true,
    };
  }),

  on(UserMealsActions.editUserMealError, (state, { error }) => {
    console.log('EDIT_USER_MEAL_ERROR action being handled');
    return { ...state, loading: false, loaded: false, error: error };
  })
);

export function userMealsReducer(state: UserMealsState, action: Action) {
  return reducer(state, action);
}
