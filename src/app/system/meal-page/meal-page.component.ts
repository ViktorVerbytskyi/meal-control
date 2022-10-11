import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  PeriodOfDay,
  UserMeal,
  UserMealSetting,
} from '../../shared/models/userMeal.model';
import { ActionsUserMealDialogComponent } from '../actions-user-meal-dialog/actions-user-meal-dialog.component';
import { AppState, MealsState } from '../../@ngrx';
import { UserMealsState } from '../../@ngrx/userMeals';
import * as UserMealsActions from '../../@ngrx/userMeals';
import * as MealsActions from '../../@ngrx/meals';
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

  userMeals$!: Observable<UserMeal[]>;
  userMealsState!: UserMealsState;

  constructor(public dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(MealsActions.getMeals());
    this.store.dispatch(UserMealsActions.getUserMeals());
    this.userMeals$ = combineLatest<[UserMealsState, MealsState]>([
      this.store.select('userMeals'),
      this.store.select('meals'),
    ]).pipe(
      tap(([userMealsState]: [UserMealsState, MealsState]) => {
        this.userMealsState = userMealsState;
      }),
      map(([userMealsState, mealsState]: [UserMealsState, MealsState]) => {
        return userMealsState.data.map((userMeal: UserMeal) => {
          let receivedMeal = mealsState.data.find(
            (meal: Meal) => meal.id === userMeal.mealId
          );
          if (receivedMeal) {
            receivedMeal = {
              ...receivedMeal,
              calories: +(
                (receivedMeal.calories * userMeal.mealWeight) /
                100
              ).toFixed(2),
              proteins: +(
                (receivedMeal.proteins * userMeal.mealWeight) /
                100
              ).toFixed(2),
              fats: +((receivedMeal.fats * userMeal.mealWeight) / 100).toFixed(
                2
              ),
              carbohydrates: +(
                (receivedMeal.carbohydrates * userMeal.mealWeight) /
                100
              ).toFixed(2),
            };
          }
          return { ...userMeal, meal: receivedMeal };
        });
      }),
      tap((userMeals: UserMeal[]) => {
        this.breakfastSetting = {
          type: PeriodOfDay.Breakfast,
          userMeals: [
            ...userMeals.filter(
              (meal: UserMeal) => meal.periodOfDay === PeriodOfDay.Breakfast
            ),
          ],
        };
        this.launchSetting = {
          type: PeriodOfDay.Launch,
          userMeals: [
            ...userMeals.filter(
              (meal: UserMeal) => meal.periodOfDay === PeriodOfDay.Launch
            ),
          ],
        };
        this.dinnerSetting = {
          type: PeriodOfDay.Dinner,
          userMeals: [
            ...userMeals.filter(
              (meal: UserMeal) => meal.periodOfDay === PeriodOfDay.Dinner
            ),
          ],
        };
        this.snackingSetting = {
          type: PeriodOfDay.Snacking,
          userMeals: [
            ...userMeals.filter(
              (meal: UserMeal) => meal.periodOfDay === PeriodOfDay.Snacking
            ),
          ],
        };
      })
    );
  }

  showAddUserMealDialog(): void {
    this.dialog.open(ActionsUserMealDialogComponent, { width: '400px' });
  }
}
