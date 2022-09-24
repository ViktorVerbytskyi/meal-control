import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

import { Meal } from '../../shared/models/meal.model';
import { ActionsMealDialogComponent } from '../actions-meal-dialog/actions-meal-dialog.component';
import { AppState, MealsState } from '../../@ngrx';
import * as MealsActions from '../../@ngrx/meals/meals.actions';

@Component({
  selector: 'app-db-page',
  templateUrl: './db-page.component.html',
  styleUrls: ['./db-page.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class DbPageComponent implements OnInit {
  dataSource = new MatTableDataSource<Meal>([]);
  columnsToDisplay = [
    'name',
    'calories',
    'proteins',
    'fats',
    'carbohydrates',
    'actions',
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Meal | null = null;
  mealState$!: Observable<MealsState>;
  mealsStateSetting!: MealsState;

  constructor(public dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(MealsActions.getMeals());
    this.mealState$ = this.store.select('meals').pipe(
      tap((mealsState: MealsState) => {
        this.mealsStateSetting = mealsState;
        this.dataSource.data = [...this.mealsStateSetting.data];
      })
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showAddMealDialog() {
    this.dialog.open(ActionsMealDialogComponent, { width: '400px' });
  }

  showEditMealDialog(meal: Meal) {
    this.dialog.open(ActionsMealDialogComponent, {
      data: { ...meal },
      width: '400px',
    });
  }
}
