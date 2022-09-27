import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  PeriodOfDayType,
  UserMeal,
  UserMealSetting,
} from '../../shared/models/userMeal.model';
import { ActionsUserMealDialogComponent } from '../actions-user-meal-dialog/actions-user-meal-dialog.component';
import { AppState } from '../../@ngrx';
import { UserMealsState } from '../../@ngrx/userMeals';
import * as UserMealsActions from '../../@ngrx/userMeals';

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

  userMealsState$!: Observable<UserMealsState>;
  userMealsState!: UserMealsState;

  constructor(public dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(UserMealsActions.getUserMeals());
    this.userMealsState$ = this.store.select('userMeals').pipe(
      tap((userMealsState: UserMealsState) => {
        this.userMealsState = userMealsState;
        this.breakfastSetting = {
          type: PeriodOfDayType.Breakfast,
          userMeals: [
            ...userMealsState.data.filter(
              (meal: UserMeal) => meal.periodOfDay === PeriodOfDayType.Breakfast
            ),
          ],
        };
        this.launchSetting = {
          type: PeriodOfDayType.Launch,
          userMeals: [
            ...userMealsState.data.filter(
              (meal: UserMeal) => meal.periodOfDay === PeriodOfDayType.Launch
            ),
          ],
        };
        this.dinnerSetting = {
          type: PeriodOfDayType.Dinner,
          userMeals: [
            ...userMealsState.data.filter(
              (meal: UserMeal) => meal.periodOfDay === PeriodOfDayType.Dinner
            ),
          ],
        };
        this.snackingSetting = {
          type: PeriodOfDayType.Snacking,
          userMeals: [
            ...userMealsState.data.filter(
              (meal: UserMeal) => meal.periodOfDay === PeriodOfDayType.Snacking
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
