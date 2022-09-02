import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { MessageText, MessageType } from '../../shared/models/message.model';
import { MessageService } from '../../shared/services/message.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.usersService
      .getUserByEmailAndPassword(this.email.value, this.password.value)
      .subscribe((user: User) => {
        if (user.email) {
          this.authService.login(user);
          this.messageService.openSnackBar(
            MessageText.LoginSuccessful,
            MessageType.Success
          );
          this.router.navigate(['/system']);
        } else {
          this.messageService.openSnackBar(
            MessageText.LoginOrPasswordIsNotCorrect,
            MessageType.Error
          );
        }
      });
  }

  get email(): FormControl {
    return this.form.controls.email;
  }

  get password(): FormControl {
    return this.form.controls.password;
  }
}
