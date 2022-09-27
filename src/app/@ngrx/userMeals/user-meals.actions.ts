import { createAction, props } from '@ngrx/store';
import { UserMeal } from '../../shared/models/userMeal.model';

export const getUserMeals = createAction('[meal-page] GET_USER_MEALS');

export const getUserMealsSuccess = createAction(
  '[Get User Meals Effect] GET_USER_MEALS_SUCCESS',
  props<{ userMeals: UserMeal[] }>()
);

export const getUserMealsError = createAction(
  '[Get User Meals Effect] GET_USER_MEALS_ERROR',
  props<{ error: Error | null }>()
);
