import { Component, OnInit } from '@angular/core';

import { UserMeal } from '../../shared/models/userMeal.model';
import { MealsService } from '../../shared/services/meals.service';
import { combineLatest, map } from 'rxjs';
import { Meal } from '../../shared/models/meal.model';

@Component({
  selector: 'app-meal-page',
  templateUrl: './meal-page.component.html',
  styleUrls: ['./meal-page.component.scss'],
})
export class MealPageComponent implements OnInit {
  userMeals: UserMeal[] = [];

  constructor(private mealsService: MealsService) {}

  ngOnInit(): void {
    combineLatest<[UserMeal[], Meal[]]>(
      this.mealsService.getAllUserMeals(),
      this.mealsService.getAllMeals()
    )
      .pipe(
        map(([allUserMeals, allMeals]) => {
          return allUserMeals.map((userMeal: UserMeal) => {
            const meal = allMeals.find(
              (meal: Meal) => meal.id === userMeal.mealId
            );
            return { ...userMeal, meal };
          });
        })
      )
      .subscribe((userMeals: UserMeal[]) => {
        this.userMeals = userMeals;
      });
  }
}
