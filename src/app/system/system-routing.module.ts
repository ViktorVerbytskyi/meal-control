import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SystemComponent } from './system.component';
import { DbPageComponent } from './db-page/db-page.component';
import { MealPageComponent } from './meal-page/meal-page.component';

const routes: Routes = [
  {
    path: 'system',
    component: SystemComponent,
    children: [
      { path: '', redirectTo: 'meal-page', pathMatch: 'full' },
      { path: 'db-page', component: DbPageComponent },
      { path: 'meal-page', component: MealPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemRoutingModule {}
