import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroLocaisReservaComponent } from './cadastro-locais-reserva.component';

describe('CadastroLocaisReservaComponent', () => {
  let component: CadastroLocaisReservaComponent;
  let fixture: ComponentFixture<CadastroLocaisReservaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroLocaisReservaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroLocaisReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
