import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UserMeal, UserMealSetting } from '../../models/userMeal.model';
import { ActionsUserMealDialogComponent } from '../../../system/actions-user-meal-dialog/actions-user-meal-dialog.component';

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
    'actions',
  ];
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  showEditUserMealDialog(userMeal: UserMeal) {
    this.dialog.open(ActionsUserMealDialogComponent, {
      data: { ...userMeal },
      width: '400px',
    });
  }
}
