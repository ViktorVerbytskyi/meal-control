export enum MessageText {
  LoginSuccessful = 'Login is successful',
  LogoutSuccessful = 'Logout is successful',
  PasswordIsNotCorrect = "Password isn't correct",
  UserIsNotExist = "This user isn't exist",
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
