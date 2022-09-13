import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  PeriodOfDayType,
  UserMeal,
  UserMealSetting,
} from '../../shared/models/userMeal.model';
import { MealsService } from '../../shared/services/meals.service';
import { Meal } from '../../shared/models/meal.model';
import { AddUserMealDialogComponent } from '../add-user-meal-dialog/add-user-meal-dialog.component';
import { AppState, UsersState } from '../../@ngrx';
import * as UserActions from '../../@ngrx/users/users.actions';

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
  userState$!: Observable<UsersState>;

  constructor(
    private mealsService: MealsService,
    public dialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    //TODO: it's example how to select data from store
    this.userState$ = this.store.select('users').pipe(
      tap((usersState: UsersState) => {
        console.log(usersState);
      })
    );

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

  showAddUserMealDialog(): void {
    this.dialog.open(AddUserMealDialogComponent, { width: '400px' });
  }

  //TODO: it's example how to dispatch data in store
  changeUserName(): void {
    this.store.dispatch(UserActions.changeUserName({ name: 'Viktor' }));
  }
}
