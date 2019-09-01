import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaLocaisReservaComponent } from './categoria-locais-reserva.component';

describe('CategoriaLocaisReservaComponent', () => {
  let component: CategoriaLocaisReservaComponent;
  let fixture: ComponentFixture<CategoriaLocaisReservaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaLocaisReservaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaLocaisReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
