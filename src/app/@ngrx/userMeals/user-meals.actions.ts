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

export const addUserMeal = createAction(
  '[meal-page] ADD_USER_MEAL',
  props<{ userMeal: UserMeal }>()
);

export const addUserMealSuccess = createAction(
  '[Add User Meal Effect] ADD_USER_MEAL_SUCCESS',
  props<{ userMeal: UserMeal }>()
);

export const addUserMealError = createAction(
  '[Add User Meal Effect] ADD_USER_MEAL_ERROR',
  props<{ error: Error | null }>()
);
