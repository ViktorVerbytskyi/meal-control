import { Meal } from '../../shared/models/meal.model';

export interface MealsState {
  data: ReadonlyArray<Meal>;
  loading: boolean;
  loaded: boolean;
  error: Error | null;
}

export const initialMealsState: MealsState = {
  data: [],
  loading: false,
  loaded: false,
  error: null,
};
