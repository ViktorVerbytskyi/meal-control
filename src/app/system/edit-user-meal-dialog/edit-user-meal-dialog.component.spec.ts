import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserMealDialogComponent } from './edit-user-meal-dialog.component';

describe('EditUserMealDialogComponent', () => {
  let component: EditUserMealDialogComponent;
  let fixture: ComponentFixture<EditUserMealDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserMealDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserMealDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
