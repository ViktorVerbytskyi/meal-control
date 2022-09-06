import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonUserMealDialogComponent } from './common-user-meal-dialog.component';

describe('CommonUserMealDialogComponent', () => {
  let component: CommonUserMealDialogComponent;
  let fixture: ComponentFixture<CommonUserMealDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonUserMealDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonUserMealDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
