import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';

import { Meal } from '../../shared/models/meal.model';
import { AddMealDialogComponent } from '../add-meal-dialog/add-meal-dialog.component';
import { Observable, tap } from 'rxjs';
import { AppState, MealsState } from '../../@ngrx';
import { Store } from '@ngrx/store';
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
  columnsToDisplay = ['name', 'calories', 'proteins', 'fats', 'carbohydrates'];
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
    this.dialog.open(AddMealDialogComponent, { width: '400px' });
  }

  //TODO: it's example how to dispatch data in store
  addMeal(): void {
    const newMeal = {
      id: 3,
      name: 'Beer',
      calories: 100,
      proteins: 500,
      fats: 400,
      carbohydrates: 600,
      description: 'Bear is so great!',
    };
    this.store.dispatch(MealsActions.addMeal({ newMeal }));
  }
}
