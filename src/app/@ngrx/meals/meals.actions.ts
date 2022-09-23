import { createAction, props } from '@ngrx/store';

import { Meal } from '../../shared/models/meal.model';

export const getMeals = createAction('[db-page (app)] GET_MEALS');

export const getMealsSuccess = createAction(
  '[Get Meals Effect] GET_MEALS_SUCCESS',
  props<{ meals: Meal[] }>()
);

export const getMealsError = createAction(
  '[Get Meals Effect] GET_MEALS_ERROR',
  props<{ error: Error | null }>()
);

export const addMeal = createAction(
  '[db-page (user)] ADD_MEAL',
  props<{ newMeal: Meal }>()
);

export const addMealSuccess = createAction(
  '[Add Meal Effect] ADD_MEAL_SUCCESS',
  props<{ newMeal: Meal }>()
);

export const addMealError = createAction(
  '[Add Meal Effect] ADD_MEAL_ERROR',
  props<{ error: Error | null }>()
);
