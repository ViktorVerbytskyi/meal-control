import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { emptyMeal, Meal } from '../../shared/models/meal.model';
import { AppState } from '../../@ngrx';
import * as MealsActions from '../../@ngrx/meals/meals.actions';

@Component({
  selector: 'app-add-meal-dialog',
  templateUrl: './add-meal-dialog.component.html',
  styleUrls: ['./add-meal-dialog.component.scss'],
})
export class AddMealDialogComponent implements OnInit {
  form = this.fb.group({
    name: ['', [Validators.required]],
    calories: ['', [Validators.required]],
    proteins: ['', [Validators.required]],
    fats: ['', [Validators.required]],
    carbohydrates: ['', [Validators.required]],
    description: [''],
  });

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {}

  onSubmit() {
    const newMeal: Meal = {
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
    this.store.dispatch(MealsActions.addMeal({ newMeal }));
  }

  get name() {
    return this.form.controls.name;
  }

  get calories() {
    return this.form.controls.calories;
  }

  get proteins() {
    return this.form.controls.proteins;
  }

  get fats() {
    return this.form.controls.fats;
  }

  get carbohydrates() {
    return this.form.controls.carbohydrates;
  }

  get description() {
    return this.form.controls.description;
  }
}
