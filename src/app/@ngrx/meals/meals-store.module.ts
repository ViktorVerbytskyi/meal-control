import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { mealsReducer } from './meals.reducer';
import { MealsEffects } from './meals.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('meals', mealsReducer),
    EffectsModule.forFeature([MealsEffects]),
  ],
})
export class MealsStoreModule {}
