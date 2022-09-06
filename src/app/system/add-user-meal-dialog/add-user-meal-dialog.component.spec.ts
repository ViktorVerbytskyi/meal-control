import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserMealDialogComponent } from './add-user-meal-dialog.component';

describe('AddUserMealDialogComponent', () => {
  let component: AddUserMealDialogComponent;
  let fixture: ComponentFixture<AddUserMealDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserMealDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserMealDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
