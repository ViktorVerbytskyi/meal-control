import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Meal } from '../../shared/models/meal.model';
import { MealsService } from '../../shared/services/meals.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-db-page',
  templateUrl: './db-page.component.html',
  styleUrls: ['./db-page.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class DbPageComponent implements OnInit {
  dataSource = new MatTableDataSource<Meal>([]);
  columnsToDisplay = ['name', 'proteins', 'fats', 'carbohydrates'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Meal | null = null;

  constructor(private mealsService: MealsService) {}

  ngOnInit(): void {
    this.mealsService.getAllMeals().subscribe((meals: Meal[]) => {
      this.dataSource.data = meals;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
