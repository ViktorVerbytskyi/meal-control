import { Action, createReducer, on } from '@ngrx/store';

import * as MealsActions from './meals.actions';
import { initialMealsState, MealsState } from './meals.store';
import { Meal } from '../../shared/models/meal.model';

const reducer = createReducer(
  initialMealsState,

  on(MealsActions.getMeals, (state) => {
    console.log('GET_MEALS action being handled');
    return { ...state, loading: true };
  }),

  on(MealsActions.getMealsSuccess, (state, { meals }) => {
    console.log('GET_MEALS_SUCCESS action being handled');
    return { ...state, data: [...meals], loading: false, loaded: true };
  }),

  on(MealsActions.getMealsError, (state, { error }) => {
    console.log('GET_MEALS_ERROR action being handled');
    return { ...state, loading: false, loaded: false, error: error };
  }),

  on(MealsActions.addMeal, (state) => {
    console.log('ADD_MEAL action being handled');
    return { ...state, loading: true };
  }),

  on(MealsActions.addMealSuccess, (state, { newMeal }) => {
    console.log('ADD_MEAL_SUCCESS action being handled');
    return {
      ...state,
      data: [...state.data, newMeal],
      loading: false,
      loaded: true,
    };
  }),

  on(MealsActions.addMealError, (state, { error }) => {
    console.log('ADD_MEAL_ERROR action being handled');
    return { ...state, loading: false, loaded: false, error: error };
  }),

  on(MealsActions.editMeal, (state) => {
    console.log('EDIT_MEAL action being handled');
    return { ...state, loading: true };
  }),

  on(MealsActions.editMealSuccess, (state, { editMeal }) => {
    console.log('EDIT_MEAL_SUCCESS action being handled');
    const data = [...state.data].map((meal: Meal) =>
      meal.id === editMeal.id ? editMeal : meal
    );
    return {
      ...state,
      data: [...data],
      loading: false,
      loaded: true,
    };
  }),

  on(MealsActions.editMealError, (state, { error }) => {
    console.log('EDIT_MEAL_ERROR action being handled');
    return { ...state, loading: false, loaded: false, error: error };
  })
);

export function mealsReducer(state: MealsState, action: Action) {
  return reducer(state, action);
}
