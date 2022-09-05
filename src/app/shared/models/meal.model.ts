export enum PeriodOfDay {
  Breakfast = 'Breakfast',
  Launch = 'Launch',
  Dinner = 'Dinner',
  Snacking = 'Snacking',
}

export const emptyMeal: Meal = {
  id: 0,
  name: '',
  calories: 0,
  proteins: 0,
  fats: 0,
  carbohydrates: 0,
  description: '',
};

export interface Meal {
  id: number;
  name: string;
  calories: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
  description: string;
}
