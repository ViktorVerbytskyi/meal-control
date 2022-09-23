import { UsersState } from './users';
import { MealsState } from './meals';

export interface AppState {
  users: UsersState;
  meals: MealsState;
}
