import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as MealsActions from './meals.actions';
import { MealsService } from '../../shared/services/meals.service';
import { Meal } from '../../shared/models/meal.model';

@Injectable()
export class MealsEffects {
  constructor(private actions$: Actions, private mealsService: MealsService) {
    console.log('[MEALS EFFECTS]');
  }

  getMeals$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(MealsActions.getMeals),
      switchMap(() => {
        return this.mealsService.getAllMeals().pipe(
          map((meals: Meal[]) => {
            return MealsActions.getMealsSuccess({ meals });
          }),
          catchError((error) => {
            return of(MealsActions.getMealsError({ error }));
          })
        );
      })
    );
  });

  addMeal$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(MealsActions.addMeal),
      switchMap((action) => {
        return this.mealsService.addMealToDB(action.newMeal).pipe(
          map((newMeal: Meal) => {
            return MealsActions.addMealSuccess({ newMeal });
          }),
          catchError((error) => {
            return of(MealsActions.addMealError({ error }));
          })
        );
      })
    );
  });
}
