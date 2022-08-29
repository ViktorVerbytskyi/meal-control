import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';

import { Meal } from '../models/meal.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  constructor(private apiService: ApiService) {}

  getAllMeals(): Observable<Meal[]> {
    return this.apiService.get('meals').pipe(delay(1000));
  }
}
