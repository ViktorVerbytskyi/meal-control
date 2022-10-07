import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';

import { Meal } from '../models/meal.model';
import { ApiService } from './api.service';
import { UserMeal } from '../models/userMeal.model';
import { emptyUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  constructor(private apiService: ApiService) {}

  getMeals(): Observable<Meal[]> {
    return this.apiService.get('meals').pipe(delay(500));
  }

  getUserMeals(): Observable<UserMeal[]> {
    const currentUserId = this.getCurrentUserId();
    return this.apiService
      .get(`userMeals?userId=${currentUserId}`)
      .pipe(delay(500));
  }

  addUserMeal(userMeal: any): Observable<any> {
    return this.apiService.post('userMeals', userMeal).pipe(delay(500));
  }

  addMealToDB(meal: Meal): Observable<Meal> {
    return this.apiService.post('meals', meal).pipe(delay(500));
  }

  editMealFromDB(meal: Meal): Observable<Meal> {
    return this.apiService.put('meals', meal).pipe(delay(500));
  }

  //TODO: this part ned to move to another place
  private getCurrentUserId(): number {
    const currentUser = localStorage.getItem('user');
    return currentUser ? JSON.parse(currentUser).id : emptyUser.id;
  }
}
