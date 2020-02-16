import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinsDeSemanaComponent } from './fins-de-semana.component';

describe('FinsDeSemanaComponent', () => {
  let component: FinsDeSemanaComponent;
  let fixture: ComponentFixture<FinsDeSemanaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinsDeSemanaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinsDeSemanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
