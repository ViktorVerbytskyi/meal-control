import { Injectable } from '@angular/core';
import {
  catchError,
  combineLatest,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { MealsService } from '../../shared/services/meals.service';
import * as UserMealsActions from './user-meals.actions';
import { UserMeal } from '../../shared/models/userMeal.model';
import { Meal } from '../../shared/models/meal.model';

@Injectable()
export class UserMealsEffects {
  constructor(private actions$: Actions, private mealsService: MealsService) {
    console.log('[USER MEALS EFFECT]');
  }

  getUserMeals$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserMealsActions.getUserMeals),
      switchMap(() => {
        return combineLatest<[UserMeal[], Meal[]]>([
          this.mealsService.getUserMeals(),
          this.mealsService.getMeals(),
        ]).pipe(
          map(([receivedUserMeals, receivedMeals]: [UserMeal[], Meal[]]) => {
            const userMeals = receivedUserMeals.map(
              (receivedUserMeal: UserMeal) => {
                const receivedMeal = receivedMeals.find(
                  (receivedMeal: Meal) =>
                    receivedMeal.id === receivedUserMeal.mealId
                );
                return { ...receivedUserMeal, meal: receivedMeal };
              }
            );
            return UserMealsActions.getUserMealsSuccess({ userMeals });
          }),
          catchError((error) => {
            return of(UserMealsActions.getUserMealsError({ error }));
          })
        );
      })
    );
  });
}
