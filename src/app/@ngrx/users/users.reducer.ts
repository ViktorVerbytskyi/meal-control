import { Action, createReducer, on } from '@ngrx/store';

import { initialUsersState, UsersState } from './users.store';
import * as UsersActions from './users.actions';
import { changeUserName } from './users.actions';
import { User } from '../../shared/models/user.model';

const reducer = createReducer(
  initialUsersState,
  on(UsersActions.getUser, (state) => {
    console.log('GET_USER_BY_EMAIL_AND_PASS action being handled');
    return { ...state };
  }),
  on(UsersActions.addUser, (state) => {
    console.log('ADD_USER action being handled');
    return { ...state };
  }),
  on(UsersActions.changeUserName, (state, { name }) => {
    console.log('ADD_USER action being handled');
    const localUser = localStorage.getItem('user') || '';
    if (localUser) {
      const localUserId = JSON.parse(localUser).id;
      const data = state.data.map((user) => {
        if (user.id === localUserId) {
          const changedUser = { ...user, name: name };
          localStorage.setItem('user', JSON.stringify(changedUser));
          return changedUser;
        }
        return user;
      });
      return { ...state, data };
    }
    return { ...state };
  })
);

export function usersReducer(state: UsersState, action: Action) {
  return reducer(state, action);
}
