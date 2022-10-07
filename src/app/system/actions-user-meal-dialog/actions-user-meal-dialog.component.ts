import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { MealsService } from '../../shared/services/meals.service';
import { emptyMeal, Meal } from '../../shared/models/meal.model';
import { UserMeal, PeriodOfDay } from '../../shared/models/userMeal.model';
import * as UserMealsActions from '../../@ngrx/userMeals/user-meals.actions';
import { AppState, MealsState } from '../../@ngrx';

@Component({
  selector: 'app-actions-user-meal-dialog',
  templateUrl: './actions-user-meal-dialog.component.html',
  styleUrls: ['./actions-user-meal-dialog.component.scss'],
})
export class ActionsUserMealDialogComponent implements OnInit {
  form = this.fb.group({
    mealName: ['', [Validators.required]],
    periodOfDay: ['', [Validators.required]],
    mealWeight: ['', [Validators.required]],
  });
  mealsState$!: Observable<MealsState>;
  allMeals!: Meal[];
  filteredMeals!: Observable<Meal[]>;
  chosenMeal!: Meal;
  periodsOfDay!: string[];
  mealInfo!: Meal;

  constructor(
    private fb: FormBuilder,
    private mealsService: MealsService,
    private appStore: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.mealInfo = { ...emptyMeal };
    this.periodsOfDay = Object.keys(PeriodOfDay);
    this.getAllMeals();
    this.setFilteredOptionsToMealSelect();
  }

  onSubmit(): void {
    const userId = this.getCurrentUserId();
    //TODO: need to rewrite code of Date
    const userMeal: UserMeal = {
      userId: userId,
      mealId: this.chosenMeal.id ? +this.chosenMeal.id : 0,
      mealWeight: this.mealWeight.value ? +this.mealWeight.value : 0,
      periodOfDay: this.periodOfDay.value
        ? this.periodOfDay.value
        : PeriodOfDay.Breakfast,
      date: new Date().toString(),
      portionType: 'gram',
    };
    this.appStore.dispatch(UserMealsActions.addUserMeal({ userMeal }));
  }

  onClickMealOption(meal: Meal): void {
    this.chosenMeal = meal;
    this.mealInfo.name = meal.name;
  }

  onChangeMealWeight(weight: string) {
    //TODO: need to rewrite this logic using function
    if (weight) {
      this.mealInfo.calories = (+this.chosenMeal.calories / 100) * +weight;
      this.mealInfo.proteins = (+this.chosenMeal.proteins / 100) * +weight;
      this.mealInfo.fats = (+this.chosenMeal.fats / 100) * +weight;
      this.mealInfo.carbohydrates =
        (+this.chosenMeal.carbohydrates / 100) * +weight;
    }
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

  private getAllMeals(): void {
    this.mealsState$ = this.appStore.select('meals').pipe(
      tap((mealsState: MealsState) => {
        this.allMeals = [...mealsState.data];
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

  private getCurrentUserId(): number {
    const currentUser = localStorage.getItem('user');
    return currentUser ? JSON.parse(currentUser).id : null;
  }
}
