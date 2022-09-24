import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsMealDialogComponent } from './actions-meal-dialog.component';

describe('ActionsMealDialogComponent', () => {
  let component: ActionsMealDialogComponent;
  let fixture: ComponentFixture<ActionsMealDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionsMealDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionsMealDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
