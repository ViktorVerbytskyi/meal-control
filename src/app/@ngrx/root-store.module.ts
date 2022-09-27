import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { metaReducers } from './meta-reducers';
import { environment } from '../../environments/environment';
import { UsersStoreModule } from './users/users-store.module';
import { MealsStoreModule } from './meals/meals-store.module';
import { UserMealsStoreModule } from './userMeals/user-meals-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers,
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: false,
          strictActionSerializability: false,
          strictActionWithinNgZone: true,
          strictActionTypeUniqueness: true,
        },
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    UsersStoreModule,
    MealsStoreModule,
    UserMealsStoreModule,
  ],
})
export class RootStoreModule {}
