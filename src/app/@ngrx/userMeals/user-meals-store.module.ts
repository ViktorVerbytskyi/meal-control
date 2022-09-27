import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { userMealsReducer } from './user-meals.reducer';
import { UserMealsEffects } from './user-meals.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('userMeals', userMealsReducer),
    EffectsModule.forFeature([UserMealsEffects]),
  ],
})
export class UserMealsStoreModule {}
