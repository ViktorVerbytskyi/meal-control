import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { usersReducer } from './users.reducer';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature('users', usersReducer)],
})
export class UsersStoreModule {}
