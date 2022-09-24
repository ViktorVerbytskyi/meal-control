import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsUserMealDialogComponent } from './actions-user-meal-dialog.component';

describe('ActionsUserMealDialogComponent', () => {
  let component: ActionsUserMealDialogComponent;
  let fixture: ComponentFixture<ActionsUserMealDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionsUserMealDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionsUserMealDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
