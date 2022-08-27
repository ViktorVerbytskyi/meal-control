import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemComponent } from './system.component';
import { DbPageComponent } from './db-page/db-page.component';
import { MealPageComponent } from './meal-page/meal-page.component';
import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SystemComponent, DbPageComponent, MealPageComponent],
  imports: [CommonModule, SystemRoutingModule, SharedModule],
})
export class SystemModule {}
