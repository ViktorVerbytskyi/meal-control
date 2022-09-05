import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';

import { SystemComponent } from './system.component';
import { DbPageComponent } from './db-page/db-page.component';
import { MealPageComponent } from './meal-page/meal-page.component';
import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddUserMealDialogComponent } from './add-user-meal-dialog/add-user-meal-dialog.component';
import { EditUserMealDialogComponent } from './edit-user-meal-dialog/edit-user-meal-dialog.component';
import { CommonUserMealDialogComponent } from '../shared/components/common-user-meal-dialog/common-user-meal-dialog.component';
import { AddMealDialogComponent } from './add-meal-dialog/add-meal-dialog.component';

@NgModule({
  declarations: [
    SystemComponent,
    DbPageComponent,
    MealPageComponent,
    AddUserMealDialogComponent,
    EditUserMealDialogComponent,
    AddMealDialogComponent,
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    SharedModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatAutocompleteModule,
    MatSelectModule,
  ],
  entryComponents: [CommonUserMealDialogComponent],
})
export class SystemModule {}
