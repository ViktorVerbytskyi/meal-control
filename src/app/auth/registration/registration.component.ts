import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {UsersService} from "../../shared/services/users.service";
import {User} from "../../shared/models/user.model";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form = this.fb.group({
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required, Validators.minLength(6)]],
    'password2': ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.usersService.getUserByEmail(this.email.value).subscribe((user: User) => {
      console.log(user);
    });
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
