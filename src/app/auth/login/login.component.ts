import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";

import { UsersService } from "../../shared/services/users.service";
import { User } from "../../shared/models/user.model";
import { MessageText, MessageType } from "../../shared/models/message.model";
import { MessageService } from "../../shared/services/message.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.usersService.getUserByEmail(this.email.value).subscribe((user: User) => {
      if (user.email) {
        if (user.password === this.password.value) {
          this.messageService.openSnackBar(MessageText.LoginSuccessful, MessageType.Success);
        } else {
          this.messageService.openSnackBar(MessageText.PasswordIsNotCorrect, MessageType.Error);
        }
      } else {
        this.messageService.openSnackBar(MessageText.UserIsNotExist, MessageType.Error);
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
