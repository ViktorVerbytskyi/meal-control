import { UsersState } from './users';
import { MealsState } from './meals';
import { UserMealsState } from './userMeals';

export interface AppState {
  users: UsersState;
  meals: MealsState;
  userMeals: UserMealsState;
}
