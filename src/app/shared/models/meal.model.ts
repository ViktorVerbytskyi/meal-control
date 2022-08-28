export const emptyMeal: Meal = {
  id: 0,
  name: '',
  proteins: 0,
  fats: 0,
  carbohydrates: 0,
  description: '',
};

export interface Meal {
  id: number;
  name: string;
  proteins: number;
  fats: number;
  carbohydrates: number;
  description: string;
}

export const mockMeals: Meal[] = [
  {
    id: 1,
    name: 'Meat',
    proteins: 100,
    fats: 200,
    carbohydrates: 300,
    description: 'Meat is so good!',
  },
  {
    id: 2,
    name: 'Beer',
    proteins: 500,
    fats: 400,
    carbohydrates: 600,
    description: 'Bear is so great!',
  },
];
