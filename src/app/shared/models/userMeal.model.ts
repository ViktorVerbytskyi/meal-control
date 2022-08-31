import { Meal } from './meal.model';

export interface UserMeal {
  userId: number;
  mealId: number;
  mealWeight: number;
  portionType: string;
  date: string;
  periodOfDay: string;
  meal?: Meal;
}
