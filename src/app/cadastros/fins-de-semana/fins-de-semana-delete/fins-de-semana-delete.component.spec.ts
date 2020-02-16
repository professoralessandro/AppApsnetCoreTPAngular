import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinsDeSemanaDeleteComponent } from './fins-de-semana-delete.component';

describe('FinsDeSemanaDeleteComponent', () => {
  let component: FinsDeSemanaDeleteComponent;
  let fixture: ComponentFixture<FinsDeSemanaDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinsDeSemanaDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinsDeSemanaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
