import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEmailsLoteEnvioComponent } from './cadastro-emails-lote-envio.component';

describe('LocaisAcessoComponent', () => {
  let component: CadastroEmailsLoteEnvioComponent;
  let fixture: ComponentFixture<CadastroEmailsLoteEnvioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroEmailsLoteEnvioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroEmailsLoteEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
