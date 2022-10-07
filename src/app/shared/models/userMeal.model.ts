import { Meal } from './meal.model';

export enum PeriodOfDay {
  Breakfast = 'Breakfast',
  Launch = 'Launch',
  Dinner = 'Dinner',
  Snacking = 'Snacking',
}

export interface UserMealSetting {
  type: PeriodOfDay;
  userMeals: UserMeal[];
}

export interface UserMeal {
  id?: number;
  userId: number;
  mealId: number;
  mealWeight: number;
  portionType: string;
  date: string;
  periodOfDay: string;
  meal?: Meal;
}
