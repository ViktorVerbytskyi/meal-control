import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { emptyUser, User } from '../models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private apiService: ApiService) {}

  getUserByEmail(email: string): Observable<User> {
    return this.apiService.get(`users?email=${email}`).pipe(
      map((user: User[]) => {
        return user[0] ? user[0] : emptyUser;
      })
    );
  }

  getUserByEmailAndPassword(email: string, password: string): Observable<User> {
    return this.apiService
      .get(`users?email=${email}&password=${password}`)
      .pipe(
        map((user: User[]) => {
          return user[0] ? user[0] : emptyUser;
        })
      );
  }

  createNewUser(user: User): Observable<User> {
    return this.apiService.post('users', user);
  }
}
