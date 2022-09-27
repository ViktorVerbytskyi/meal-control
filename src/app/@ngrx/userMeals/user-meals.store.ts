import { UserMeal } from '../../shared/models/userMeal.model';

export interface UserMealsState {
  data: ReadonlyArray<UserMeal>;
  loading: boolean;
  loaded: boolean;
  error: Error | null;
}

export const initialUserMealsState: UserMealsState = {
  data: [],
  loading: false,
  loaded: false,
  error: null,
};
