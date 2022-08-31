import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMealsTableComponent } from './user-meals-table.component';

describe('UserMealsTableComponent', () => {
  let component: UserMealsTableComponent;
  let fixture: ComponentFixture<UserMealsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMealsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMealsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
