import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  first,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
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
      return of(control.value).pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => control.markAsTouched()),
        switchMap((value: string) => {
          return this.userService
            .getUserByEmail(value)
            .pipe(
              map((user: User) =>
                value === user.email ? { emailIsUsed: true } : null
              )
            );
        }),
        first()
      );
    };
  }
}
