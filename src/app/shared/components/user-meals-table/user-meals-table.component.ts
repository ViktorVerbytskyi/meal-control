import { Component, Input, OnInit } from '@angular/core';
import { UserMeal } from '../../models/userMeal.model';

@Component({
  selector: 'app-user-meals-table',
  templateUrl: './user-meals-table.component.html',
  styleUrls: ['./user-meals-table.component.scss'],
})
export class UserMealsTableComponent implements OnInit {
  @Input() set userMeals(meals: UserMeal[]) {
    if (meals) {
      this.dataSource = meals;
    }
  }
  dataSource: UserMeal[] = [];
  displayedColumns: string[] = [
    'name',
    'proteins',
    'fats',
    'carbohydrates',
    'mealWeight',
  ];
  constructor() {}

  ngOnInit(): void {}
}
