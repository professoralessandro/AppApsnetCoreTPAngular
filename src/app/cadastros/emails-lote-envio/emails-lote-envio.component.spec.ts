import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsLoteEnvioComponent } from './emails-lote-envio.component';

describe('LocaisAcessoComponent', () => {
  let component: EmailsLoteEnvioComponent;
  let fixture: ComponentFixture<EmailsLoteEnvioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailsLoteEnvioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailsLoteEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
