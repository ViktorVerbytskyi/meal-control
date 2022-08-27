import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbPageComponent } from './db-page.component';

describe('DbPageComponent', () => {
  let component: DbPageComponent;
  let fixture: ComponentFixture<DbPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DbPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
