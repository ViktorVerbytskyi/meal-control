import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../shared/services/message.service';
import { MessageText, MessageType } from '../shared/models/message.model';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
})
export class SystemComponent implements OnInit {
  constructor(private router: Router, private messageService: MessageService) {}

  ngOnInit(): void {}

  logOut() {
    this.router.navigate(['']);
    this.messageService.openSnackBar(
      MessageText.LogoutSuccessful,
      MessageType.Success
    );
  }
}
