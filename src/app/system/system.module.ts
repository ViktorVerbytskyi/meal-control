import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { SystemComponent } from './system.component';
import { DbPageComponent } from './db-page/db-page.component';
import { MealPageComponent } from './meal-page/meal-page.component';
import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ActionsUserMealDialogComponent } from './actions-user-meal-dialog/actions-user-meal-dialog.component';
import { EditUserMealDialogComponent } from './edit-user-meal-dialog/edit-user-meal-dialog.component';
import { ActionsMealDialogComponent } from './actions-meal-dialog/actions-meal-dialog.component';

@NgModule({
  declarations: [
    SystemComponent,
    DbPageComponent,
    MealPageComponent,
    ActionsUserMealDialogComponent,
    EditUserMealDialogComponent,
    ActionsMealDialogComponent,
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
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class SystemModule {}
