import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { Meal } from '../models/meal.model';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  constructor(private http: HttpClient) {}

  getAllMeals(): Observable<Meal[]> {
    return this.http
      .get<Meal[]>('http://localhost:3000/meals')
      .pipe(delay(1000));
  }
}
