import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { emptyUser, User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User[]>(`http://localhost:3000/users?email=${email}`).pipe(
      map((user: User[]) => {
        return user[0] ? user[0] : emptyUser;
      })
    );
  }

  createNewUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/users', user);
  }
}
