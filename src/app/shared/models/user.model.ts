export const emptyUser: User = {
  id: 0,
  name: '',
  email: '',
  password: ''
};

export interface User {
  id?: number,
  name: string,
  email: string,
  password: string,
}
