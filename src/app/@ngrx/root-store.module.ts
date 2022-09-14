import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';

import { UsersStoreModule } from './users/users-store.module';
import { metaReducers } from './meta-reducers';

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
          strictStateSerializability: true,
          strictActionSerializability: true,
          strictActionWithinNgZone: true,
          strictActionTypeUniqueness: true,
        },
      }
    ),
    // EffectsModule.forRoot([]),
    UsersStoreModule,
  ],
})
export class RootStoreModule {}
