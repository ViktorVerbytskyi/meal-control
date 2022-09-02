import { Component, OnInit } from '@angular/core';

import {
  PeriodOfDayType,
  UserMeal,
  UserMealSetting,
} from '../../shared/models/userMeal.model';
import { MealsService } from '../../shared/services/meals.service';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { Meal } from '../../shared/models/meal.model';

@Component({
  selector: 'app-meal-page',
  templateUrl: './meal-page.component.html',
  styleUrls: ['./meal-page.component.scss'],
})
export class MealPageComponent implements OnInit {
  breakfastSetting!: UserMealSetting;
  launchSetting!: UserMealSetting;
  dinnerSetting!: UserMealSetting;
  snackingSetting!: UserMealSetting;

  userMeals!: UserMeal[];
  userMealSettings$!: Observable<UserMealSetting[]>;

  constructor(private mealsService: MealsService) {}

  ngOnInit(): void {
    this.userMealSettings$ = combineLatest<[UserMeal[], Meal[]]>(
      this.mealsService.getAllUserMeals(),
      this.mealsService.getAllMeals()
    ).pipe(
      map(([allUserMeals, allMeals]) => {
        return allUserMeals.map((userMeal: UserMeal) => {
          const meal = allMeals.find(
            (meal: Meal) => meal.id === userMeal.mealId
          );
          return { ...userMeal, meal };
        });
      }),
      tap((userMeals: UserMeal[]) => {
        this.userMeals = userMeals;
      }),
      map((userMeals: UserMeal[]) => {
        const breakfastType: UserMealSetting = {
          type: PeriodOfDayType.Breakfast,
          userMeals: [
            ...userMeals.filter(
              (meal: UserMeal) => meal.periodOfDay === PeriodOfDayType.Breakfast
            ),
          ],
        };
        const launchType: UserMealSetting = {
          type: PeriodOfDayType.Launch,
          userMeals: [
            ...userMeals.filter(
              (meal: UserMeal) => meal.periodOfDay === PeriodOfDayType.Launch
            ),
          ],
        };
        const dinnerType: UserMealSetting = {
          type: PeriodOfDayType.Dinner,
          userMeals: [
            ...userMeals.filter(
              (meal: UserMeal) => meal.periodOfDay === PeriodOfDayType.Dinner
            ),
          ],
        };
        const snackingType: UserMealSetting = {
          type: PeriodOfDayType.Snacking,
          userMeals: [
            ...userMeals.filter(
              (meal: UserMeal) => meal.periodOfDay === PeriodOfDayType.Snacking
            ),
          ],
        };
        return [breakfastType, launchType, dinnerType, snackingType];
      }),
      tap(
        ([
          breakfastType,
          launchType,
          dinnerType,
          snackingType,
        ]: UserMealSetting[]) => {
          this.breakfastSetting = breakfastType;
          this.launchSetting = launchType;
          this.dinnerSetting = dinnerType;
          this.snackingSetting = snackingType;
        }
      )
    );
  }
}
