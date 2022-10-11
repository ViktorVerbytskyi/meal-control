import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { emptyMeal, Meal } from '../../shared/models/meal.model';
import { UserMeal, PeriodOfDay } from '../../shared/models/userMeal.model';
import * as UserMealsActions from '../../@ngrx/userMeals/user-meals.actions';
import { AppState, MealsState } from '../../@ngrx';
import { ActionUserMealDialogBtn, ActionUserMealDialogTitles } from './enums';

@Component({
  selector: 'app-actions-user-meal-dialog',
  templateUrl: './actions-user-meal-dialog.component.html',
  styleUrls: ['./actions-user-meal-dialog.component.scss'],
})
export class ActionsUserMealDialogComponent implements OnInit {
  actionUserMealDialogTitles = ActionUserMealDialogTitles;
  actionUserMealDialogBtn = ActionUserMealDialogBtn;

  form = this.fb.group({
    mealName: ['', [Validators.required]],
    periodOfDay: ['', [Validators.required]],
    mealWeight: [0, [Validators.required]],
  });

  mealsState$!: Observable<MealsState>;
  filteredMeals!: Observable<Meal[]>;
  allMeals: Meal[] = [];
  chosenMeal: Meal = emptyMeal;
  periodsOfDay!: string[];
  mealInfo: Meal = emptyMeal;

  constructor(
    private fb: FormBuilder,
    private appStore: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: UserMeal
  ) {}

  ngOnInit(): void {
    this.periodsOfDay = Object.keys(PeriodOfDay);
    this.getMealsAndSetData();
    this.setFilteredOptionsToMealSelect();
  }

  onSubmit(): void {
    this.data ? this.editUserMeal(this.data) : this.addUserMeal();
  }

  onClickMealOption(meal: Meal): void {
    this.chosenMeal = meal;
    this.mealInfo.name = meal.name;
    this.setMealInfo();
  }

  onChangeMealWeight() {
    this.setMealInfo();
  }

  get mealName() {
    return this.form.controls.mealName;
  }

  get periodOfDay() {
    return this.form.controls.periodOfDay;
  }

  get mealWeight() {
    return this.form.controls.mealWeight;
  }

  private getMealsAndSetData(): void {
    this.mealsState$ = this.appStore.select('meals').pipe(
      tap((mealsState: MealsState) => {
        this.allMeals = [...mealsState.data];
      }),
      tap((mealState: MealsState) => {
        if (this.data) {
          this.patchValueToForm();
          this.chosenMeal =
            mealState.data.find((meal: Meal) => meal.id === this.data.mealId) ||
            emptyMeal;
          this.setMealInfo();
        }
      })
    );
  }

  private setFilteredOptionsToMealSelect(): void {
    this.filteredMeals = this.mealName.valueChanges.pipe(
      map((value: string | null) =>
        value?.length && value.length >= 2 ? value : ''
      ),
      //TODO: may be need to move this logic to another place
      tap((value: string) => {
        if (this.chosenMeal && this.chosenMeal.name !== value) {
          this.chosenMeal = this.mealInfo = emptyMeal;
        }
      }),
      map((value: string) => {
        if (!value.length) return [];
        return this.allMeals.filter((meal) =>
          meal.name.toLowerCase().includes(value.toLowerCase())
        );
      })
    );
  }

  private addUserMeal(): void {
    const userMeal = this.createUserMeal();
    this.appStore.dispatch(UserMealsActions.addUserMeal({ userMeal }));
  }

  private editUserMeal({ userId, mealId, date }: UserMeal): void {
    const editUserMeal = { ...this.createUserMeal(), userId, mealId, date };
    this.appStore.dispatch(UserMealsActions.editUserMeal({ editUserMeal }));
  }

  private createUserMeal(): UserMeal {
    //TODO: need to rewrite code of Date
    return {
      id: this.data.id,
      userId: this.getCurrentUserId(),
      mealId: this.chosenMeal.id ?? 0,
      mealWeight: this.mealWeight.value ?? 0,
      periodOfDay: this.periodOfDay.value ?? PeriodOfDay.Breakfast,
      date: new Date().toString(),
      portionType: 'gram',
    };
  }

  private getCurrentUserId(): number {
    const currentUser = localStorage.getItem('user');
    return currentUser ? JSON.parse(currentUser).id : null;
  }

  private patchValueToForm(): void {
    this.form.patchValue({
      mealName: this.data.meal?.name,
      periodOfDay: this.data.periodOfDay,
      mealWeight: this.data.mealWeight,
    });
  }

  private setMealInfo(): void {
    const weight = this.mealWeight.value || 0;
    //TODO: need to rewrite this logic using function
    this.mealInfo.name = this.chosenMeal.name;
    this.mealInfo.calories = +(
      (+this.chosenMeal.calories * +weight) /
      100
    ).toFixed(2);
    this.mealInfo.proteins = +(
      (+this.chosenMeal.proteins * +weight) /
      100
    ).toFixed(2);
    this.mealInfo.fats = +((+this.chosenMeal.fats * +weight) / 100).toFixed(2);
    this.mealInfo.carbohydrates = +(
      (+this.chosenMeal.carbohydrates * +weight) /
      100
    ).toFixed(2);
  }
}
