import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuiosqueReservaComponent } from './quiosque-reserva.component';

describe('QuiosqueReservaComponent', () => {
  let component: QuiosqueReservaComponent;
  let fixture: ComponentFixture<QuiosqueReservaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuiosqueReservaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuiosqueReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
