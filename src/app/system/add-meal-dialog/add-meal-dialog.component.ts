import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.form);
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
}
