import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { UserMealsTableComponent } from './components/user-meals-table/user-meals-table.component';
import { CommonUserMealDialogComponent } from './components/common-user-meal-dialog/common-user-meal-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    MatIconModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    UserMealsTableComponent,
    MatTableModule,
    MatProgressSpinnerModule,
    CommonUserMealDialogComponent,
    MatDialogModule,
  ],
  declarations: [UserMealsTableComponent, CommonUserMealDialogComponent],
})
export class SharedModule {}
