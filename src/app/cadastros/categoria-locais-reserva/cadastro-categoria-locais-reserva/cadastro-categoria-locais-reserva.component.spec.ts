import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCategoriaLocaisReservaComponent } from './cadastro-categoria-locais-reserva.component';

describe('CadastroCategoriaLocaisReservaComponent', () => {
  let component: CadastroCategoriaLocaisReservaComponent;
  let fixture: ComponentFixture<CadastroCategoriaLocaisReservaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroCategoriaLocaisReservaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroCategoriaLocaisReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
