import { User } from "../models/user.model";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private isAuthenticated = false;

  login(user: User): void {
    const { name, email } = user;
    localStorage.setItem('user', JSON.stringify({ name, email }));
    this.isAuthenticated = true;
  }

  logout(): void {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user')
    }
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
