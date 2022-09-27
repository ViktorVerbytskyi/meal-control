import { Action, createReducer, on } from '@ngrx/store';

import { initialUserMealsState, UserMealsState } from './user-meals.store';
import * as UserMealsActions from './user-meals.actions';

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
  })
);

export function userMealsReducer(state: UserMealsState, action: Action) {
  return reducer(state, action);
}
