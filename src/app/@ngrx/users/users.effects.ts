import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions) {
    console.log('[USER EFFECTS]');
  }
}
