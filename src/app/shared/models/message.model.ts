export enum MessageText {
  LoginSuccessful = 'Login is successful',
  LogoutSuccessful = 'Logout is successful',
  AccessDenied = 'Access denied! Need to login!',
  LoginOrPasswordIsNotCorrect = 'Login or password is not correct.',
  PasswordsAreNotTheSame = 'Passwords are not the same!',
  RegistrationIsSuccessful = 'Successful. You can login to system.',
}

export enum MessageType {
  Success = 'success-snackbar',
  Error = 'error-snackbar',
}

export interface Message {
  type: string;
  message: string;
}
