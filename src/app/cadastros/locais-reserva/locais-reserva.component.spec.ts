import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaisReservaComponent } from './locais-reserva.component';

describe('LocaisReservaComponent', () => {
  let component: LocaisReservaComponent;
  let fixture: ComponentFixture<LocaisReservaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocaisReservaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocaisReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
