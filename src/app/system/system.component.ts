import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from '../shared/services/message.service';
import { MessageText, MessageType } from '../shared/models/message.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
})
export class SystemComponent implements OnInit {
  date: Date = new Date();
  userName: string = '';

  constructor(
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.setUserName();
  }

  logOut() {
    this.authService.logout();
    this.messageService.openSnackBar(
      MessageText.LogoutSuccessful,
      MessageType.Success
    );
    this.router.navigate(['']);
  }

  setUserName(): void {
    const storageUser = localStorage.getItem('user');
    this.userName = storageUser ? JSON.parse(storageUser).name : 'User';
  }
}
