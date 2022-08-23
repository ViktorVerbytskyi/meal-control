import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private _snackBar: MatSnackBar) {
  }

  openSnackBar(message: string, type: string, duration: number = 3000) {
    this._snackBar.open(message, '',{
      duration: duration,
      panelClass: type,
    });
  }
}
