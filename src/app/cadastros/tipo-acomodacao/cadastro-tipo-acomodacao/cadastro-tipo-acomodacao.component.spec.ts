import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroTipoAcomodacaoComponent } from './cadastro-tipo-acomodacao.component';

describe('CadastroTipoAcomodacaoComponent', () => {
  let component: CadastroTipoAcomodacaoComponent;
  let fixture: ComponentFixture<CadastroTipoAcomodacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroTipoAcomodacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroTipoAcomodacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
