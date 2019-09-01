import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroTipoServicoComponent } from './cadastro-tipo-servico.component';

describe('CadastroTipoServicoComponent', () => {
  let component: CadastroTipoServicoComponent;
  let fixture: ComponentFixture<CadastroTipoServicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroTipoServicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroTipoServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
