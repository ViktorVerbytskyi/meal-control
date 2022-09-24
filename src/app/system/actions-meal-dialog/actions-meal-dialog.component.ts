import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { emptyMeal, Meal } from '../../shared/models/meal.model';
import { AppState } from '../../@ngrx';
import * as MealsActions from '../../@ngrx/meals/meals.actions';
import { ActionMealDialogBtn, ActionMealDialogTitles } from './enums';

@Component({
  selector: 'app-actions-meal-dialog',
  templateUrl: './actions-meal-dialog.component.html',
  styleUrls: ['./actions-meal-dialog.component.scss'],
})
export class ActionsMealDialogComponent implements OnInit {
  actionMealDialogTitles = ActionMealDialogTitles;
  actionMealDialogBtn = ActionMealDialogBtn;
  form = this.fb.group({
    name: ['', [Validators.required]],
    calories: [0, [Validators.required]],
    proteins: [0, [Validators.required]],
    fats: [0, [Validators.required]],
    carbohydrates: [0, [Validators.required]],
    description: [''],
  });

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: Meal
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.patchValueToForm();
    }
  }

  onSubmit(): void {
    !this.data ? this.addMealToDB() : this.editMealFromDB(this.data.id);
  }

  get name(): FormControl {
    return this.form.controls.name;
  }

  get calories(): FormControl {
    return this.form.controls.calories;
  }

  get proteins(): FormControl {
    return this.form.controls.proteins;
  }

  get fats(): FormControl {
    return this.form.controls.fats;
  }

  get carbohydrates(): FormControl {
    return this.form.controls.carbohydrates;
  }

  get description(): FormControl {
    return this.form.controls.description;
  }

  private patchValueToForm(): void {
    this.form.patchValue({
      name: this.data.name,
      calories: this.data.calories,
      proteins: this.data.proteins,
      fats: this.data.fats,
      carbohydrates: this.data.carbohydrates,
      description: this.data.description ?? emptyMeal.description,
    });
  }

  private addMealToDB(): void {
    const newMeal = this.createMeal();
    this.store.dispatch(MealsActions.addMeal({ newMeal }));
  }

  private editMealFromDB(mealId: number | undefined): void {
    const editMeal = { id: mealId, ...this.createMeal() };
    this.store.dispatch(MealsActions.editMeal({ editMeal }));
  }

  private createMeal(): Meal {
    return {
      name: this.name.value ? this.name.value : emptyMeal.name,
      calories: this.calories.value ? +this.calories.value : emptyMeal.calories,
      proteins: this.proteins.value ? +this.proteins.value : emptyMeal.proteins,
      fats: this.fats.value ? +this.fats.value : emptyMeal.fats,
      carbohydrates: this.carbohydrates.value
        ? +this.carbohydrates.value
        : emptyMeal.carbohydrates,
      description: this.description.value
        ? this.description.value
        : emptyMeal.description,
    };
  }
}
