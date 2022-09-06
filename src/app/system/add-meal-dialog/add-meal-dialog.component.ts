import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MealsService } from '../../shared/services/meals.service';
import { Meal } from '../../shared/models/meal.model';

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

  constructor(private fb: FormBuilder, private mealsService: MealsService) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.form.value);
    const meal: Meal = {
      name: this.name.value ? this.name.value : '',
      calories: this.calories.value ? +this.calories.value : 0,
      proteins: this.proteins.value ? +this.proteins.value : 0,
      fats: this.fats.value ? +this.fats.value : 0,
      carbohydrates: this.carbohydrates.value ? +this.carbohydrates.value : 0,
      description: this.description.value ? this.description.value : '',
    };
    this.mealsService.addMealToDB(meal).subscribe();
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
