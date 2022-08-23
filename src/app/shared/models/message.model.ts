export enum MessageText {
  LoginSuccessful = 'Login successful',
  PasswordIsNotCorrect = 'Password isn\'t correct',
  UserIsNotExist = 'This user isn\'t exist'
}

export enum MessageType {
  Success = 'success-snackbar',
  Error = 'error-snackbar'
}

export interface Message {
  type: string;
  message: string;
}
