import { createAction, props } from '@ngrx/store';

import { User } from '../../shared/models/user.model';

export const getUser = createAction(
  '[Registration page] GET_USER_BY_EMAIL_AND_PASS'
);

export const addUser = createAction(
  '[Registration page] ADD_USER',
  props<{ user: User }>
);
