import { Meal } from './meal.model';

export enum PeriodOfDayType {
  Breakfast = 'Breakfast',
  Launch = 'Launch',
  Dinner = 'Dinner',
  Snacking = 'Snacking',
}

export interface UserMealSetting {
  type: PeriodOfDayType;
  userMeals: UserMeal[];
}

export interface UserMeal {
  userId: number;
  mealId: number;
  mealWeight: number;
  portionType: string;
  date: string;
  periodOfDay: PeriodOfDayType;
  meal?: Meal;
}
