import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SystemComponent } from './system.component';
import { DbPageComponent } from './db-page/db-page.component';
import { MealPageComponent } from './meal-page/meal-page.component';
import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SystemComponent, DbPageComponent, MealPageComponent],
  imports: [
    CommonModule,
    SystemRoutingModule,
    SharedModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
  ],
})
export class SystemModule {}
