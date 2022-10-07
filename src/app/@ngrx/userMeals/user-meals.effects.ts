import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { MealsService } from '../../shared/services/meals.service';
import * as UserMealsActions from './user-meals.actions';
import { UserMeal } from '../../shared/models/userMeal.model';

@Injectable()
export class UserMealsEffects {
  constructor(private actions$: Actions, private mealsService: MealsService) {
    console.log('[USER MEALS EFFECT]');
  }

  getUserMeals$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserMealsActions.getUserMeals),
      switchMap(() => {
        return this.mealsService.getUserMeals().pipe(
          map((userMeals: UserMeal[]) => {
            return UserMealsActions.getUserMealsSuccess({ userMeals });
          }),
          catchError((error) => {
            return of(UserMealsActions.getUserMealsError({ error }));
          })
        );
      })
    );
  });

  addUserMeal$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserMealsActions.addUserMeal),
      switchMap((action) => {
        return this.mealsService.addUserMeal(action.userMeal).pipe(
          map((userMeal: UserMeal) => {
            return UserMealsActions.addUserMealSuccess({ userMeal });
          }),
          catchError((error) => {
            return of(UserMealsActions.addUserMealError({ error }));
          })
        );
      })
    );
  });
}
