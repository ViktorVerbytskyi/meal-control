import { Action, createReducer, on } from '@ngrx/store';

import { initialUsersState, UsersState } from './users.store';
import * as UsersActions from './users.actions';

const reducer = createReducer(
  initialUsersState,
  on(UsersActions.getUser, (state) => {
    console.log('GET_USER_BY_EMAIL_AND_PASS action being handled');
    return { ...state };
  }),
  on(UsersActions.addUser, (state) => {
    console.log('ADD_USER action being handled');
    return { ...state };
  })
);

export function usersReducer(state: UsersState, action: Action) {
  return reducer(state, action);
}
