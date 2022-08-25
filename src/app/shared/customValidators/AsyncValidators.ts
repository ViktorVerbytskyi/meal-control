import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AsyncValidators {
  constructor(private userService: UsersService) {}

  checkUserForEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.userService.getUserByEmail(control.value).pipe(
        map((user: User) => {
          if (control.value === user.email) {
            return { emailIsUsed: true };
          } else {
            return null;
          }
        })
      );
    };
  }
}
