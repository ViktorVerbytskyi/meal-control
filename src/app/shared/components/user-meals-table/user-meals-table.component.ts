import { Component, Input, OnInit } from '@angular/core';
import { UserMealSetting } from '../../models/userMeal.model';

@Component({
  selector: 'app-user-meals-table',
  templateUrl: './user-meals-table.component.html',
  styleUrls: ['./user-meals-table.component.scss'],
})
export class UserMealsTableComponent implements OnInit {
  @Input() setting!: UserMealSetting;

  displayedColumns: string[] = [
    'name',
    'mealWeight',
    'calories',
    'proteins',
    'fats',
    'carbohydrates',
  ];
  constructor() {}

  ngOnInit(): void {}
}
