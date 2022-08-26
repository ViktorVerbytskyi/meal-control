import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { MessageService } from '../../shared/services/message.service';
import { MessageText, MessageType } from '../../shared/models/message.model';
import { AsyncValidators } from '../../shared/customValidators/AsyncValidators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: [
      '',
      [Validators.required, Validators.email],
      [this.asyncValidators.checkUserForEmail()],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private messageService: MessageService,
    private router: Router,
    private asyncValidators: AsyncValidators
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.form);
    if (this.password.value === this.password2.value) {
      const user: User = {
        name: this.name.value,
        email: this.email.value,
        password: this.password.value,
      };
      this.usersService.createNewUser(user).subscribe((user: User) => {
        this.messageService.openSnackBar(
          MessageText.RegistrationIsSuccessful,
          MessageType.Success
        );
        this.router.navigate(['/login']);
      });
    } else {
      this.messageService.openSnackBar(
        MessageText.PasswordsAreNotTheSame,
        MessageType.Error
      );
    }
  }

  get name(): FormControl {
    return this.form.controls.name;
  }

  get email(): FormControl {
    return this.form.controls.email;
  }

  get password(): FormControl {
    return this.form.controls.password;
  }

  get password2(): FormControl {
    return this.form.controls.password2;
  }
}
