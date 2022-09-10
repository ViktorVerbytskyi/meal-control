import { User } from '../../shared/models/user.model';

export interface UsersState {
  data: ReadonlyArray<User>;
}

export const initialUsersState: UsersState = {
  data: [
    {
      id: 1,
      email: 'Viktor_Verbytskyi@epam.com',
      password: '123123',
      name: 'admin',
    },
  ],
};
