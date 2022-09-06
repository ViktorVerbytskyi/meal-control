import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';

import { Meal } from '../models/meal.model';
import { ApiService } from './api.service';
import { UserMeal } from '../models/userMeal.model';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  constructor(private apiService: ApiService) {}

  getAllMeals(): Observable<Meal[]> {
    return this.apiService.get('meals').pipe(delay(500));
  }

  getAllUserMeals(): Observable<UserMeal[]> {
    return this.apiService.get('userMeals').pipe(delay(500));
  }

  addMealToDB(meal: Meal): Observable<Meal> {
    return this.apiService.post('meals', meal).pipe(delay(500));
  }
}
